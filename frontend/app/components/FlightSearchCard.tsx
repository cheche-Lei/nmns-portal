'use client';

import clsx from 'clsx';
import {
  Armchair,
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  Plane,
  Ticket,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { JSX, useMemo, useRef, useState } from 'react';
import { ymdInTZ } from '../utils/date';

const TZ = 'Asia/Taipei';
const TODAY_YMD = ymdInTZ(new Date(), TZ); //SSR/Client 一致

export type TripType = 'roundtrip' | 'oneway';
export type CabinClass = 'Economy' | 'Business';

export interface FlightSearchValues {
  tripType: TripType;
  origin: string; // IATA
  destination: string; // IATA
  departDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: CabinClass;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3007';
const TODAY = new Date().toISOString().slice(0, 10);

/* ---------- UI wrappers ---------- */
const FieldShell = ({
  label,
  icon,
  children,
  showChevron = true,
}: {
  label: string;
  icon: JSX.Element;
  children: React.ReactNode;
  showChevron?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-[color:var(--sw-primary)]/70">{label}</span>
    <div className="relative h-12 flex items-center gap-2 rounded-[var(--sw-r-md)] bg-[color:var(--sw-white)] border border-[color:var(--sw-accent)] px-3">
      <span className="text-[color:var(--sw-primary)]">{icon}</span>
      <div className="flex-1">{children}</div>
      {showChevron && (
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--sw-primary)]" />
      )}
    </div>
  </div>
);

function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-[min(680px,92vw)] rounded-[var(--sw-r-lg)] bg-white shadow-xl border border-[color:var(--sw-accent)]">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="font-semibold">{title ?? '選擇機場'}</div>
          <button
            onClick={onClose}
            className="sw-btn sw-btn--grey-square h-8 px-2 py-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

/* ---------- 搜尋式挑選器 ---------- */
function AirportSearchPicker({
  onConfirm,
  onCancel,
  hint,
}: {
  onConfirm: (pick: { iata: string; label: string }) => void;
  onCancel: () => void;
  hint?: string;
}) {
  const [q, setQ] = useState(hint ?? '');
  const [list, setList] = useState<
    Array<{
      id: string;
      iata: string;
      name: string;
      city: string;
      countryCode: string;
    }>
  >([]);
  const [loading, setLoading] = useState(false);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3007';

  // --- 自動搜尋 + debounce ---
  React.useEffect(() => {
    const t = setTimeout(async () => {
      if (!q.trim()) {
        setList([]);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE}/api/flight-search/airports?query=${encodeURIComponent(q)}`
        );
        const json = await res.json();
        setList(json);
      } catch (e) {
        console.error('airports search failed', e);
        setList([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="space-y-4 text-[color:var(--sw-primary)]">
      {/* 搜尋框 */}
      <div className="flex items-center border border-[color:var(--sw-accent)] rounded-[var(--sw-r-md)] px-3 py-2 focus-within:shadow-[0_0_0_2px_var(--sw-accent)] transition-shadow">
        <Plane className="w-4 h-4 text-[color:var(--sw-primary)]/70 mr-2" />
        <input
          autoFocus
          className="flex-1 bg-transparent outline-none text-[color:var(--sw-primary)] placeholder:text-[color:var(--sw-primary)]/50"
          placeholder="輸入城市、機場或 IATA 代碼，例如：TPE、Tokyo、NRT"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* 清單 */}
      <div className="max-h-[48vh] overflow-auto space-y-2">
        {loading && (
          <div className="text-sm text-[color:var(--sw-primary)]/70 px-2">
            查詢中…
          </div>
        )}
        {!loading && list.length === 0 && q && (
          <div className="text-sm text-[color:var(--sw-primary)]/70 px-2">
            找不到符合的機場
          </div>
        )}
        {list.map((a) => (
          <button
            key={`${a.id}-${a.iata}`}
            onClick={() =>
              onConfirm({ iata: a.iata, label: `${a.iata} — ${a.name}` })
            }
            className="w-full flex items-center justify-between px-4 py-3 border border-[color:var(--sw-grey)] rounded-[var(--sw-r-md)] hover:border-[color:var(--sw-accent)] hover:bg-[color:var(--sw-accent)]/10 transition"
          >
            <div className="font-semibold text-[color:var(--sw-primary)]">
              {a.iata} · {a.city}
            </div>
            <div className="text-sm text-[color:var(--sw-primary)]/70">
              {a.name}（{a.countryCode}）
            </div>
          </button>
        ))}
      </div>

      {/* 底部按鈕 */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onCancel}
          className="sw-btn sw-btn--grey-square hover:bg-[color:var(--sw-grey)]/30 transition"
        >
          取消
        </button>
      </div>
    </div>
  );
}

/* ---------- 主元件 ---------- */
export default function FlightSearchCard() {
  const router = useRouter();

  const [values, setValues] = useState<FlightSearchValues>({
    tripType: 'roundtrip',
    origin: '',
    destination: '',
    departDate: TODAY,
    returnDate: TODAY,
    passengers: 1,
    cabinClass: 'Economy',
  });

  // 顯示用標籤（避免還要再查一次機場名稱）
  const [originLabel, setOriginLabel] = useState('');
  const [destLabel, setDestLabel] = useState('');

  // Modal
  const [openOriginPicker, setOpenOriginPicker] = useState(false);
  const [openDestPicker, setOpenDestPicker] = useState(false);

  // 日期 input
  const departRef = useRef<HTMLInputElement | null>(null);
  const returnRef = useRef<HTMLInputElement | null>(null);

  const canSubmit = useMemo(() => {
    const base =
      !!values.origin &&
      !!values.destination &&
      !!values.departDate &&
      values.passengers > 0;
    return values.tripType === 'roundtrip' ? base && !!values.returnDate : base;
  }, [values]);

  const handle = <K extends keyof FlightSearchValues>(
    key: K,
    value: FlightSearchValues[K]
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const swapOD = () =>
    setValues((v) => {
      // 同步交換標籤
      setOriginLabel(destLabel);
      setDestLabel(originLabel);
      return { ...v, origin: v.destination, destination: v.origin };
    });

  const openPicker = (which: 'depart' | 'return') => {
    const el = which === 'depart' ? departRef.current : returnRef.current;
    el?.showPicker ? el.showPicker() : el?.focus();
  };

  const setTripType = (tt: TripType) => {
    setValues((prev) =>
      tt === 'oneway'
        ? { ...prev, tripType: tt, returnDate: undefined }
        : { ...prev, tripType: tt, returnDate: prev.returnDate ?? TODAY }
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const params = new URLSearchParams({
      tripType: values.tripType,
      origin: values.origin,
      destination: values.destination,
      departDate: values.departDate,
      ...(values.tripType === 'roundtrip' && values.returnDate
        ? { returnDate: values.returnDate }
        : {}),
      passengers: String(values.passengers),
      cabin: values.cabinClass,
    });
    router.push(`/flight-booking?${params.toString()}`);
  };

  return (
    <>
      <div
        className={clsx(
          'w-full max-w-[1140px] overflow-hidden shadow-sm',
          'rounded-[var(--sw-r-md)] border border-[color:var(--sw-accent)] bg-[color:var(--sw-white)]'
        )}
      >
        {/* Tabs */}
        <div className="py-2 flex justify-center bg-[color:var(--sw-accent)]">
          <div className="inline-flex rounded-full bg-[color:var(--sw-primary)]/10 p-1">
            <button
              onClick={() => setTripType('roundtrip')}
              className={clsx(
                'px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition',
                values.tripType === 'roundtrip'
                  ? 'bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] shadow'
                  : 'text-[color:var(--sw-primary)]/80 hover:bg-[color:var(--sw-white)]/30'
              )}
            >
              來回
            </button>
            <button
              onClick={() => setTripType('oneway')}
              className={clsx(
                'px-4 sm:px-5 py-1.5 rounded-full text-sm font-medium transition',
                values.tripType === 'oneway'
                  ? 'bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] shadow'
                  : 'text-[color:var(--sw-primary)]/80 hover:bg-[color:var(--sw-white)]/30'
              )}
            >
              單程
            </button>
          </div>
        </div>

        {/* 表單 */}
        <div className="px-4 md:px-6 pt-4 pb-5">
          {/* 第1排：起點 | 交換 | 到達 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            {/* 起點 */}
            <div className="md:col-span-5">
              <FieldShell label="起點" icon={<Plane className="w-4 h-4" />}>
                <button
                  type="button"
                  onClick={() => setOpenOriginPicker(true)}
                  className="w-full text-left bg-transparent outline-none"
                >
                  {values.origin ? (
                    <span className="text-[color:var(--sw-primary)]">
                      {originLabel || values.origin}
                    </span>
                  ) : (
                    <span className="text-[color:var(--sw-primary)]/50">
                      搜尋城市 / 機場 / IATA
                    </span>
                  )}
                </button>
              </FieldShell>
            </div>

            {/* 交換按鈕 */}
            <div className="md:col-span-2 flex items-end md:items-center justify-center">
              <button
                type="button"
                onClick={swapOD}
                aria-label="交換出發與到達"
                className={clsx(
                  'h-12 w-12 rounded-full border border-[color:var(--sw-accent)]',
                  'bg-[color:var(--sw-white)] hover:bg-[color:var(--sw-accent)]/10',
                  'flex items-center justify-center transition'
                )}
                title="交換出發與到達"
              >
                <ArrowLeftRight className="w-5 h-5 text-[color:var(--sw-primary)]" />
              </button>
            </div>

            {/* 到達 */}
            <div className="md:col-span-5">
              <FieldShell label="到達" icon={<Plane className="w-4 h-4" />}>
                <button
                  type="button"
                  onClick={() => setOpenDestPicker(true)}
                  className="w-full text-left bg-transparent outline-none"
                >
                  {values.destination ? (
                    <span className="text-[color:var(--sw-primary)]">
                      {destLabel || values.destination}
                    </span>
                  ) : (
                    <span className="text-[color:var(--sw-primary)]/50">
                      搜尋城市 / 機場 / IATA
                    </span>
                  )}
                </button>
              </FieldShell>
            </div>
          </div>

          {/* 第2排：日期 / 乘客 / 艙等 */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            <div className="md:col-span-6">
              <FieldShell
                label="日期"
                icon={<Calendar className="w-4 h-4" />}
                showChevron={false}
              >
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => openPicker('depart')}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs text-[color:var(--sw-primary)] font-medium">
                      出發
                    </span>
                    <input
                      ref={departRef}
                      type="date"
                      className="bg-[color:var(--sw-white)] text-[color:var(--sw-primary)] outline-none"
                      value={values.departDate}
                      min={TODAY}
                      onChange={(e) => handle('departDate', e.target.value)}
                    />
                  </button>
                  <span className="text-[color:var(--sw-primary)]/40">—</span>
                  <button
                    onClick={() => openPicker('return')}
                    disabled={values.tripType === 'oneway'}
                    className="flex items-center gap-2 disabled:opacity-50"
                  >
                    <span className="text-xs text-[color:var(--sw-primary)] font-medium">
                      回程
                    </span>
                    <input
                      ref={returnRef}
                      type="date"
                      className="bg-transparent outline-none text-[color:var(--sw-primary)] font-semibold disabled:text-[color:var(--sw-primary)]/50"
                      value={values.returnDate ?? ''}
                      min={values.departDate || TODAY}
                      onChange={(e) => handle('returnDate', e.target.value)}
                      disabled={values.tripType === 'oneway'}
                    />
                  </button>
                </div>
              </FieldShell>
            </div>

            <div className="md:col-span-3">
              <FieldShell label="乘客" icon={<User className="w-4 h-4" />}>
                <select
                  className="w-full bg-transparent outline-none text-[color:var(--sw-primary)] font-semibold"
                  value={values.passengers}
                  onChange={(e) => handle('passengers', Number(e.target.value))}
                >
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </div>

            <div className="md:col-span-3">
              <FieldShell label="艙等" icon={<Armchair className="w-4 h-4" />}>
                <select
                  className="w-full bg-transparent outline-none text-[color:var(--sw-primary)] font-semibold"
                  value={values.cabinClass}
                  onChange={(e) =>
                    handle('cabinClass', e.target.value as CabinClass)
                  }
                >
                  <option value="Economy">經濟艙</option>
                  <option value="Business">商務艙</option>
                </select>
              </FieldShell>
            </div>
          </div>

          {/* 送出 */}
          <div className="w-full flex justify-center mt-6">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={handleSubmit}
              className={clsx(
                'sw-btn sw-btn--gold-primary rounded-full',
                !canSubmit && 'opacity-60 cursor-not-allowed'
              )}
            >
              <Ticket className="w-4 h-4 text-[color:var(--sw-primary)] mr-2" />
              訂購機票
            </button>
          </div>
        </div>
      </div>

      {/* 起點 Modal */}
      <Modal
        open={openOriginPicker}
        onClose={() => setOpenOriginPicker(false)}
        title="選擇起點"
      >
        <AirportSearchPicker
          hint="TPE"
          onCancel={() => setOpenOriginPicker(false)}
          onConfirm={({ iata, label }) => {
            setValues((v) => ({ ...v, origin: iata }));
            setOriginLabel(label);
            setOpenOriginPicker(false);
          }}
        />
      </Modal>

      {/* 到達 Modal */}
      <Modal
        open={openDestPicker}
        onClose={() => setOpenDestPicker(false)}
        title="選擇到達"
      >
        <AirportSearchPicker
          hint="NRT"
          onCancel={() => setOpenDestPicker(false)}
          onConfirm={({ iata, label }) => {
            setValues((v) => ({ ...v, destination: iata }));
            setDestLabel(label);
            setOpenDestPicker(false);
          }}
        />
      </Modal>
    </>
  );
}
