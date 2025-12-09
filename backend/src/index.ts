// 匯⼊套件及類型定義 (類別、介⾯)
import express from "express";
// *** verbatimModuleSyntax 為 true 時，標⽰匯⼊類型
import type { Request, Response } from "express";
// 截⼊環境變數設定檔
import "dotenv/config";
// 載入各種路由
import apiRouter from "./routes/index.js";
// //若晴測試會員
// import authRoutes from "./routes/auth.routes.js";
// import memberRoutes from "./routes/member.routes.js"; 
// 周邊工具安裝：zod 驗證、session 們
import cors from "cors";
import session from "express-session";
import path from "path";
import sessionFileStore from "session-file-store";

const FileStore = sessionFileStore(session);

// 建⽴伺服器主物件
const app = express();
// 設定靜態內容資料夾
app.use(express.static(path.join(process.cwd(), "public")));
// 解析 JSON body 的中間件
app.use(express.json());
// 解析 URL-encoded body 的中間件
app.use(express.urlencoded({ extended: true }));
// 11/11若晴新增 會員頭像圖庫
app.use("/avatars", express.static(path.join(process.cwd(), "public/avatars")));
app.use('/planner/cover', express.static(path.join(process.cwd(), 'public/planner/cover')));
// 允許所有來源訪問
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("localhost:3000") ||
        origin.includes("127.0.0.1:3000") ||
        /^http:\/\/192\.168\.\d+\.\d+:3000$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("不符合 CORS 設定，拒絕存取"));
      }       
    },
    credentials: true,
  })
);

// console.log("cwd =", process.cwd());

app.set("json replacer", (_key: any, value: { toString: () => any }) =>
  typeof value === "bigint" ? value.toString() : value
);

// - - - 路由區 - - -

// 網站根目錄⾴⾯
app.get("/", (req: Request, res: Response) => {
  res.send("歡迎來到 Express + TS !");
});

// //若晴測試中
// // 登入／註冊／驗證 路由
// app.use("/api/auth", authRoutes);
// app.use("/api/member", memberRoutes);

// 測試 Prisma 與 Create
app.use("/api", apiRouter);

const port = +(process.env.PORT || "3007");
app.listen(port, () => {
  console.log(`Express + TS 啟動 http://localhost:${port}`);
});
