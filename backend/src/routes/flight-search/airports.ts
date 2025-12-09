import { Router, type Request, type Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const QuerySchema = z.object({
  query: z.string().trim().min(1, "query is required"),
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const parsed = QuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json(parsed.error.flatten());
    }

    const q = parsed.data.query.trim();
    if (q.length < 2) {
      // 搜尋字太短就不打 DB，直接回空陣列
      return res.json([]);
    }

    // 1) 找符合的城市
    const matchedCities = await prisma.city.findMany({
      where: { cityName: { contains: q } }, // 若你的 DB collation 已是不分大小寫，這樣就夠
      select: {
        cityId: true,
        cityName: true,
        country: { select: { countryCode: true } },
      },
      take: 50,
    });

    // 轉成 number，避免 BigInt 與 number 混用造成 Set/Map 比對問題
    const cityIdSet = new Set<number>(
      matchedCities.map((c) => Number(c.cityId))
    );

    const cityInfoMap = new Map<number, { cityName: string; countryCode: string }>(
      matchedCities.map((c) => [
        Number(c.cityId),
        { cityName: c.cityName, countryCode: c.country?.countryCode ?? "" },
      ])
    );

    // 2) 查機場（IATA 前綴 / 名稱包含 / 位於上述城市）
    const airports = await prisma.airport.findMany({
      where: {
        OR: [
          // IATA 用 startsWith 體驗更像 auto-complete
          { airportCode: { startsWith: q.toUpperCase() } },
          { airportName: { contains: q } },
          ...(cityIdSet.size > 0
            ? [{ cityId: { in: Array.from(cityIdSet) as any } }]
            : []),
        ],
      },
      select: {
        airportId: true,
        airportCode: true,
        airportName: true,
        cityId: true,
      },
      orderBy: [{ airportCode: "asc" }],
      take: 20,
    });

    // 3) 補查缺的 city（若沒 join 關聯）
    const missingCityIds = Array.from(
      new Set(
        airports
          .map((a) => (a.cityId != null ? Number(a.cityId) : undefined))
          .filter((id): id is number => id !== undefined && !cityInfoMap.has(id))
      )
    );

    if (missingCityIds.length > 0) {
      const extraCities = await prisma.city.findMany({
        where: { cityId: { in: missingCityIds as any } },
        select: {
          cityId: true,
          cityName: true,
          country: { select: { countryCode: true } },
        },
      });
      for (const c of extraCities) {
        cityInfoMap.set(Number(c.cityId), {
          cityName: c.cityName,
          countryCode: c.country?.countryCode ?? "",
        });
      }
    }

    // 4) DTO
    const dto = airports.map((a) => {
      const cityInfo = cityInfoMap.get(Number(a.cityId));
      return {
        id: a.airportId ?? a.airportCode,
        iata: a.airportCode,
        name: a.airportName,
        city: cityInfo?.cityName ?? "",
        countryCode: cityInfo?.countryCode ?? "",
      };
    });

    res.json(dto);
  } catch (err) {
    console.error("[airports] error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
