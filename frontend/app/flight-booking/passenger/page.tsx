'use client';

import { Calendar, Info, Mail, User, UserCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  FareDetailsFromStore,
  type Segment,
} from '../components/FareDetailsModal';
import StepActions from '../components/StepActions';

type Gender = 'M' | 'F';

type Passenger = {
  gender: Gender;
  firstName: string;
  lastName: string;
  birthday: string; // yyyy-mm-dd
  nationality: string; // ISO-2
  passportNo: string;
  passportExpiry: string; // yyyy-mm-dd
};

type Contact = {
  firstName: string;
  lastName: string;
  phoneCountry: string;
  phone: string;
  email: string;
};

const NATIONALITIES = [
  { code: 'TW', label: '台灣 Taiwan' },
  { code: 'JP', label: '日本 Japan' },
  { code: 'US', label: '美國 USA' },
  { code: 'HK', label: '香港 Hong Kong' },
  { code: 'CN', label: '中國 China' },
];

const PHONE_CODES = [
  { code: '886', label: '台灣 +886' },
  { code: '81', label: '日本 +81' },
  { code: '852', label: '香港 +852' },
  { code: '1', label: '美國 +1' },
];

const STORAGE_KEY = 'stelwing.passenger.form';

export default function PassengerPage() {
  const router = useRouter();
  const sp = useSearchParams();

  // ====== 保留上一頁查詢字串（傳給下一頁） ======
  const qs = useMemo(() => {
    const keys = [
      'tripType',
      'origin',
      'destination',
      'departDate',
      'returnDate',
      'pax',
      'passengers',
      'cabin',
      'cabinClass',
    ];
    const out = new URLSearchParams();
    keys.forEach((k) => {
      const v = sp.get(k);
      if (v != null) out.set(k, v);
    });
    return out.toString();
  }, [sp]);

  // ====== 票價合計與「查看明細」彈窗 ======
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [openDetails, setOpenDetails] = useState(false);
  const [obSeg, setObSeg] = useState<Segment | null>(null);
  const [ibSeg, setIbSeg] = useState<Segment | null>(null);

  useEffect(() => {
    try {
      const ob = JSON.parse(sessionStorage.getItem('fare_outbound') ?? '{}');
      const ib = JSON.parse(sessionStorage.getItem('fare_inbound') ?? '{}');

      const obFare = Number(ob?.finalFare) || 0;
      const ibFare = Number(ib?.finalFare) || 0;
      setTotalPrice(obFare + ibFare);

      if (ob?.flightNo) {
        const leg = ob?.leg ?? {};
        setObSeg({
          title: '去程',
          flightNo: ob.flightNo,
          originCode: leg.originCode ?? sp.get('origin') ?? 'TPE',
          originName: leg.originName ?? '出發地',
          depTime: leg.depTime ?? '',
          destinationCode:
            leg.destinationCode ?? sp.get('destination') ?? 'NRT',
          destinationName: leg.destinationName ?? '目的地',
          arrTime: leg.arrTime ?? '',
          cabin: ob.cabin ?? '經濟艙',
          fare: obFare,
          currency: 'TWD',
        });
      } else {
        setObSeg(null);
      }

      if (ib?.flightNo) {
        const leg = ib?.leg ?? {};
        setIbSeg({
          title: '回程',
          flightNo: ib.flightNo,
          originCode: leg.originCode ?? sp.get('destination') ?? 'NRT',
          originName: leg.originName ?? '出發地',
          depTime: leg.depTime ?? '',
          destinationCode: leg.destinationCode ?? sp.get('origin') ?? 'TPE',
          destinationName: leg.destinationName ?? '目的地',
          arrTime: leg.arrTime ?? '',
          cabin: ib.cabin ?? '經濟艙',
          fare: ibFare,
          currency: 'TWD',
        });
      } else {
        setIbSeg(null);
      }
    } catch {
      setTotalPrice(0);
      setObSeg(null);
      setIbSeg(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====== 表單狀態 ======
  const [pax, setPax] = useState<Passenger>({
    gender: 'M',
    firstName: '',
    lastName: '',
    birthday: '',
    nationality: 'TW',
    passportNo: '',
    passportExpiry: '',
  });

  const [contact, setContact] = useState<Contact>({
    firstName: '',
    lastName: '',
    phoneCountry: '886',
    phone: '',
    email: '',
  });

  // 載入暫存
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.pax) setPax(parsed.pax);
        if (parsed?.contact) setContact(parsed.contact);
      }
    } catch {}
  }, []);

  // 即時存
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ pax, contact }));
  }, [pax, contact]);

  // 右上「帶入目前會員資料」
  const fillFromMember = () => {
    // 這裡示意，之後可串後端/會員中心
    setContact((c) => ({
      ...c,
      firstName: c.firstName || 'Zichen',
      lastName: c.lastName || 'Lin',
      phoneCountry: c.phoneCountry || '886',
      phone: c.phone || '0912345678',
      email: c.email || 'baron@example.com',
    }));
    setPax((p) => ({
      ...p,
      firstName: p.firstName || 'ZICHEN',
      lastName: p.lastName || 'LIN',
      gender: p.gender || 'M',
    }));
  };

  const canNext =
    pax.firstName.trim() &&
    pax.lastName.trim() &&
    pax.gender &&
    pax.birthday &&
    contact.firstName.trim() &&
    contact.lastName.trim() &&
    contact.phone.trim() &&
    contact.email.trim();

  // ====== 導頁：上一頁 / 下一步（到行李與餐點） ======
  const goPrev = () => router.push(`/flight-booking?${qs}`);
  const goNext = () => router.push(`/flight-booking/extras?${qs}`);

  return (
    <div>
      <div className="mx-auto px-4 md:px-6 py-6 md:py-8">
        <h2 className="text-xl md:text-2xl font-bold text-[color:var(--sw-primary)] mb-4">
          資料填寫
        </h2>

        {/* === 區塊 1：訂位人（聯絡人）— 移到最上方，右上有帶入按鈕 === */}
        <section className="rounded-2xl border border-[color:var(--sw-grey)]/30 bg-[color:var(--sw-primary)] text-[color:var(--sw-white)] shadow-sm">
          <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5 border-b border-[color:var(--sw-grey)]/20">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 opacity-90" />
              <h3 className="font-semibold">訂位人（聯絡人）聯絡資訊</h3>
            </div>
            <button
              type="button"
              className="sw-btn sw-btn--outline rounded-full"
              onClick={fillFromMember}
            >
              帶入目前會員資料
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6">
            {/* 左側說明 */}
            <aside className="md:col-span-4 p-5 md:p-6 border-b md:border-b-0 md:border-r border-[color:var(--sw-grey)]/20">
              <p className="text-sm leading-6 opacity-90">
                此電子郵件與手機將作為行程與通知之主要管道，請務必填寫正確資訊。
              </p>
            </aside>

            {/* 右側表單（聯絡人） */}
            <div className="md:col-span-8 p-5 md:p-6">
              {/* 姓名 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-4">
                <div className="md:col-span-4">
                  <label className="text-xs opacity-90 block mb-1">名字</label>
                  <div className="relative">
                    <UserCircle2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                    <input
                      value={contact.firstName}
                      onChange={(e) =>
                        setContact({ ...contact, firstName: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-3 py-2 outline-none placeholder:opacity-60"
                      placeholder="First name"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <label className="text-xs opacity-90 block mb-1">姓氏</label>
                  <input
                    value={contact.lastName}
                    onChange={(e) =>
                      setContact({ ...contact, lastName: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none placeholder:opacity-60"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* 手機 / Email */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                <div className="md:col-span-6">
                  <label className="text-xs opacity-90 block mb-1">
                    手機號碼
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={contact.phoneCountry}
                      onChange={(e) =>
                        setContact({ ...contact, phoneCountry: e.target.value })
                      }
                      className="w-28 bg-white/10 border border-white/20 rounded-lg px-2 py-2 outline-none"
                    >
                      {PHONE_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg py-2 outline-none placeholder:opacity-60"
                      placeholder="0912-345-678"
                    />
                  </div>
                </div>

                <div className="md:col-span-6">
                  <label className="text-xs opacity-90 block mb-1">
                    電子郵件信箱
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none placeholder:opacity-60"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 區塊 2：旅客資訊（第二段） === */}
        <section className="mt-6 rounded-2xl border border-[color:var(--sw-grey)]/30 bg-[color:var(--sw-primary)] text-[color:var(--sw-white)] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6">
            {/* 左側說明 */}
            <aside className="md:col-span-4 p-5 md:p-6 border-b md:border-b-0 md:border-r border-[color:var(--sw-grey)]/20">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <Info className="w-5 h-5 opacity-90" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">旅客資訊</h3>
                  <p className="text-sm leading-6 opacity-90">
                    護照與機票英文字姓名需一致；若護照僅有名，姓氏請填
                    <span className="font-semibold"> FNU</span>。
                  </p>
                </div>
              </div>
            </aside>

            {/* 右側表單（旅客） */}
            <div className="md:col-span-8 p-5 md:p-6">
              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">旅客 1 成人</div>

                {/* 性別 */}
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-sm">性別</span>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-[color:var(--sw-accent)]"
                      checked={pax.gender === 'M'}
                      onChange={() => setPax({ ...pax, gender: 'M' })}
                    />
                    男
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      className="accent-[color:var(--sw-accent)]"
                      checked={pax.gender === 'F'}
                      onChange={() => setPax({ ...pax, gender: 'F' })}
                    />
                    女
                  </label>
                </div>

                {/* 姓名 / 生日 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-4">
                  <div className="md:col-span-4">
                    <label className="text-xs opacity-90 block mb-1">
                      名字（與護照相同）
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                      <input
                        value={pax.firstName}
                        onChange={(e) =>
                          setPax({ ...pax, firstName: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-3 py-2 outline-none placeholder:opacity-60"
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-xs opacity-90 block mb-1">
                      姓氏（與護照相同）
                    </label>
                    <input
                      value={pax.lastName}
                      onChange={(e) =>
                        setPax({ ...pax, lastName: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none placeholder:opacity-60"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-xs opacity-90 block mb-1">
                      生日
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
                      <input
                        type="date"
                        value={pax.birthday}
                        onChange={(e) =>
                          setPax({ ...pax, birthday: e.target.value })
                        }
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-3 py-2 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 國籍 / 護照 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                  <div className="md:col-span-4">
                    <label className="text-xs opacity-90 block mb-1">
                      國籍
                    </label>
                    <select
                      value={pax.nationality}
                      onChange={(e) =>
                        setPax({ ...pax, nationality: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none"
                    >
                      {NATIONALITIES.map((n) => (
                        <option key={n.code} value={n.code}>
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-xs opacity-90 block mb-1">
                      護照號碼
                    </label>
                    <input
                      value={pax.passportNo}
                      onChange={(e) =>
                        setPax({ ...pax, passportNo: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none placeholder:opacity-60"
                      placeholder="Passport No."
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-xs opacity-90 block mb-1">
                      護照到期日
                    </label>
                    <input
                      type="date"
                      value={pax.passportExpiry}
                      onChange={(e) =>
                        setPax({ ...pax, passportExpiry: e.target.value })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 底部操作列 */}
        <StepActions onPrev={goPrev} onNext={goNext} nextDisabled={!canNext} />
      </div>
      {/* 掛 store 版本的彈窗（跨頁可用） */}
      <FareDetailsFromStore />
    </div>
  );
}
