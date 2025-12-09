'use client';

import Image from 'next/image';
import FlightSearchCard from './components/FlightSearchCard';
import HomeMain from './components/HomeMain';

export default function AppPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero（縮短高度 + 調整圖片） */}
      <section className="relative w-full bg-[#162532] text-white overflow-hidden">
        {/* 背景光暈：避免擋點擊 */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_0%_0%,rgba(255,255,255,0.06),rgba(0,0,0,0))]" />

        <div className="relative w-full">
          <div className="mx-auto w-[1440px] px-6">
            {/* 縮小上/下 padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 pt-8 md:pt-12 pb-20 md:pb-24">
              {/* 左：文字 */}
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                  Welcome to Stelwing
                </h1>
                <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl">
                  Stelwing Airlines
                  提供一站式航空與旅遊服務，讓您的每一趟旅程都舒適、便捷、難忘。
                </p>
              </div>

              {/* 右：飛機圖（降低高度、避免失焦） */}
              <div className="relative flex justify-end items-start">
                <Image
                  src="/images/flight1.png"
                  alt="Stelwing private jet"
                  // 這裡給一個「大於你實際顯示」的 intrinsic 尺寸，避免被放大而糊掉
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width:1280px) 560px, (min-width:1024px) 520px, (min-width:768px) 460px, 320px"
                  className="
                  w-[320px]           /* 手機 */
                  sm:w-[380px]        /* 小平板 */
                  md:w-[460px]        /* 平板 */
                  lg:w-[520px]        /* 桌機 */
                  xl:w-[560px]        /* 大桌機 */
                  h-auto
                  object-contain
                  object-right
                  drop-shadow-[0_18px_28px_rgba(0,0,0,0.30)]
                "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 搜尋卡：獨立區塊 + 負 margin 疊上去（不會被吃掉、可操作） */}
      <section className="relative z-20 -mt-[120px] w-full">
        <div className="mx-auto w-full max-w-[1440px] px-6 flex justify-center">
          <FlightSearchCard
            onSubmit={(values) => {
              console.log('search submit:', values);
            }}
            initialValues={{
              tripType: 'roundtrip',
              origin: 'TPE',
              destination: 'NRT',
              cabinClass: 'Business',
            }}
          />
        </div>
      </section>

      {/* 後續內容間距（依實際畫面可調） */}
      <section className="h-2" />
      <HomeMain />
    </main>
  );
}
