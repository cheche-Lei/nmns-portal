'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1F2E3C] text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + 描述 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="Stelwing Logo"
                width={125}
                height={48}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Stelwing Airlines
            提供一站式航空與旅遊服務，讓您的每一趟旅程都舒適、便捷、難忘。
          </p>
        </div>

        {/* 服務項目 */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-[#D9B37B]">
            服務項目
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/flight-search" className="hover:text-white">
                訂購機票
              </Link>
            </li>
            <li>
              <Link href="/hotels" className="hover:text-white">
                住宿預定
              </Link>
            </li>
            <li>
              <Link href="/dutyfree" className="hover:text-white">
                免稅商品
              </Link>
            </li>
            <li>
              <Link href="/plans" className="hover:text-white">
                旅程規劃
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:text-white">
                旅遊分享
              </Link>
            </li>
          </ul>
        </div>

        {/* 聯絡資訊 */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-[#D9B37B]">
            聯絡資訊
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>地址：台北市信義區松高路 88 號 10 樓</li>
            <li>電話：02-1234-5678</li>
            <li>服務時間：週一至週五 09:00 - 18:00</li>
          </ul>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 Stelwing Airlines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
