'use client';

import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const hotels = [
  {
    id: 'A',
    title: 'Hotel A',
    rating: 4.8,
    img: '/images/hotel/room3.jpeg',
  },
  { id: 'B', title: 'Hotel B', rating: 4.8, img: '/images/hotel/room4.jpeg' },
  // 中間大卡
  {
    id: 'C',
    title: 'Hotel C',
    rating: 4.8,
    img: '/images/hotel/room2.jpeg',
    featured: true,
  },
  { id: 'D', title: 'Hotel D', rating: 4.8, img: '/images/hotel/food1.jpeg' },
  { id: 'E', title: 'Hotel E', rating: 4.8, img: '/images/hotel/food3.jpeg' },
];

const dutyfree = [
  {
    id: 1,
    brand: 'Estee Lauder',
    name: '雅詩蘭黛特潤導入全方位修護露100ML',
    img: '/images/dutyfree/brown.png',
  },
  {
    id: 2,
    brand: 'Ray-Ban',
    name: 'Ray-Ban 經典飛行員墨鏡',
    img: '/images/dutyfree/sunglasses.png',
  },
  {
    id: 3,
    brand: 'Prada',
    name: 'Prada 漁夫帽尼龍系列',
    img: '/images/dutyfree/p1.png',
  },
  {
    id: 4,
    brand: 'Laura Mercier',
    name: 'Laura Mercier 柔光透明香氛',
    img: '/images/dutyfree/aromatherapy.png',
  },
  {
    id: 5,
    brand: 'Giorgio Armani',
    name: 'Giorgio Armani 光韻持久粉底液',
    img: '/images/dutyfree/essence.png',
  },
  {
    id: 6,
    brand: 'YSL',
    name: 'YSL 奢華緞面唇膏',
    img: '/images/dutyfree/mainRight.jpg',
  },
];

// 旅遊文章輪播資料
const travelArticles = [
  {
    id: 1,
    title: '轉機也能小旅行：半日城市散步提案',
    description:
      '利用轉機空檔，快速走進城市生活。從車站周邊商圈、隱藏咖啡店，到必拍地標，一篇幫你排好輕鬆散步路線。',
    href: '#',
  },
  {
    id: 2,
    title: '三天兩夜城市快閃：新手自由行行程範例',
    description:
      '想要第一次自己規劃行程又不想踩雷？透過實際範例帶你拆解交通、住宿與景點順序，讓短天數旅行也能玩得很充實。',
    href: '#',
  },
  {
    id: 3,
    title: '一個人的旅行：適合獨旅的城市與玩法',
    description:
      '從安全友善、交通便利到拍照好看，精選適合獨旅的城市，搭配晚間散步與早晨咖啡路線，陪你安心完成第一趟獨自出發。',
    href: '#',
  },
];

export default function HomeMain() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 自動輪播
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % travelArticles.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? travelArticles.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % travelArticles.length);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const activeArticle = travelArticles[currentSlide];

  return (
    <div className="w-full">
      {/* 住宿預訂（卡片內 footer；不再重疊） */}
      <section className="max-w-[1440px] mx-auto px-6 py-12 md:py-16">
        <h2 className="text-center text-xl font-semibold text-[#1F2E3C]">
          住宿預訂
        </h2>
        {/* 副標題 */}
        <p className="mt-3 text-center text-sm md:text-base text-[#4B5563]">
          精選全球飯店與特色住宿，一站式完成查詢、比價與預訂，讓每一段旅程都住得舒適又安心。
        </p>

        {/* 三欄比例：左2 / 中3 / 右2；固定列高 330px */}
        <div className="mt-10 grid gap-8 grid-cols-1 md:[grid-template-columns:2fr_3fr_2fr] md:auto-rows-[330px]">
          {/* 小卡模板：請用這個結構 */}
          {/* A：左上 */}
          <article className="group md:col-start-1 md:col-end-2 md:row-start-1 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              {/* 圖片吃滿剩餘空間 */}
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/room3.jpeg"
                  alt="Hotel A"
                  fill
                  className="object-cover"
                />
              </div>
              {/* 卡片內 footer：標題＋評分 */}
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel A</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* C：中間大卡（跨兩列，總高 = 2*330 + gap(32) = 692px） */}
          <article className="md:col-start-2 md:col-end-3 md:row-start-1 md:row-span-2 md:h-[calc(2*330px+32px)]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/room2.jpeg"
                  alt="Hotel C"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg md:text-xl font-semibold text-[#1F2E3C]">
                  Hotel C
                </p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* D：右上 */}
          <article className="group md:col-start-3 md:col-end-4 md:row-start-1 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/food1.jpeg"
                  alt="Hotel D"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel D</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* B：左下 */}
          <article className="group md:col-start-1 md:col-end-2 md:row-start-2 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/room4.jpeg"
                  alt="Hotel B"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel B</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>

          {/* E：右下 */}
          <article className="group md:col-start-3 md:col-end-4 md:row-start-2 md:h-[330px]">
            <div className="h-full rounded-[14px] border-2 border-[#D9B37B] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
              <div className="relative flex-1">
                <Image
                  src="/images/hotel/food3.jpeg"
                  alt="Hotel E"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-[#1F2E3C]">Hotel E</p>
                <div className="flex items-center gap-1 text-[#D9B37B]">
                  <Star size={18} className="fill-current" />
                  <span className="text-sm text-[#8A8F98]">4.8</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 免稅商品 */}
      <section className="bg-[#233544] text-white py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-center text-lg md:text-xl font-semibold">
            免稅商品
          </h2>
          {/* 副標題 */}
          <p className="mt-3 text-center text-sm md:text-base text-white/80">
            起飛前先選好心儀的美妝、精品與旅遊小物，線上預購機上或機場取貨，讓購物更省時、行李更輕盈。
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dutyfree.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/05 backdrop-blur-sm"
              >
                {/* 圖片 */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* 下方說明區：白色背景 */}
                <div className="p-4 md:p-5 bg-white">
                  {/* 品牌名稱：金色 sw-accent */}
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--sw-accent)' }}
                  >
                    {p.brand}
                  </p>

                  {/* 商品名稱：深色字 */}
                  <p className="mt-2 text-sm leading-relaxed text-[#1F2E3C]">
                    {p.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 圖像型宣傳 Banner：旅遊文章輪播 */}
      <section className="relative">
        <div className="relative h-[420px] md:h-[520px]">
          <Image
            src="/images/travel1.jpg"
            alt="Travel inspiration"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* 左側資訊卡 */}
          <div className="absolute left-64 right-auto top-16 md:top-20">
            <div className="mx-6 md:ml-6">
              <div className="w-[300px] md:w-[360px] rounded-2xl bg-[#1F2E3C]/80 text-white p-5 md:p-6 shadow-lg">
                {/* 小標 */}
                <p className="text-xs tracking-[0.18em] uppercase text-[#D9B37B]">
                  TRAVEL STORIES
                </p>

                {/* 動態標題＋內容：與旅遊文章相關 */}
                <h3 className="mt-2 text-lg md:text-xl font-semibold">
                  {activeArticle.title}
                </h3>
                <p className="mt-3 text-sm text-white/85 leading-relaxed">
                  {activeArticle.description}
                </p>

                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#D9B37B] px-4 py-2 text-[#1F2E3C] text-sm font-semibold hover:brightness-95">
                  前往文章
                  <ChevronRight size={16} />
                </button>

                {/* 控制列：上一張／播放暫停／下一張＋頁面指示 */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    aria-label="上一篇旅遊文章"
                    onClick={handlePrev}
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    aria-label={isPlaying ? '暫停輪播' : '播放輪播'}
                    onClick={handleTogglePlay}
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg白/15"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    aria-label="下一篇旅遊文章"
                    onClick={handleNext}
                    className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* 右側：頁碼＋小 dot 指示器 */}
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-white/80">
                      {String(currentSlide + 1).padStart(2, '0')} /{' '}
                      {String(travelArticles.length).padStart(2, '0')}
                    </span>
                    <div className="flex gap-1">
                      {travelArticles.map((article, idx) => (
                        <button
                          key={article.id}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`切換到第 ${idx + 1} 則文章`}
                          className={`h-1.5 w-4 rounded-full transition ${
                            idx === currentSlide
                              ? 'bg-[#D9B37B]'
                              : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
