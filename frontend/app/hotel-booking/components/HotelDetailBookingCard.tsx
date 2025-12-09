'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HotelDetailData } from '../interfaces/HotelDetailData';

interface HotelDetailBookingCardProps {
  hotel: HotelDetailData;
  formData: {
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    rooms: number;
    roomType: string;
    smokingPreference?: string;
  };
  onInputChange: (field: string, value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function HotelDetailBookingCard({
  hotel,
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
}: HotelDetailBookingCardProps) {
  const [mounted, setMounted] = useState(false);
  // 在組件掛載後設置 mounted 為 true
  useEffect(() => setMounted(true), []);

  // totalPrice 僅根據傳入的 props (來自 URL 參數或上層元件的穩定狀態) 計算
  const totalPrice = hotel.price * formData.nights * formData.rooms;

  // 格式化價格的輔助函式，解決水合作用問題
  const renderFormattedPrice = () => {
    // 伺服器渲染 (SSR) 階段: 渲染原始價格字串 (例如 $10500)，不進行地區格式化
    const rawPriceString = `$${totalPrice.toString()}`;

    // 客戶端渲染 (CSR) 階段 (mounted = true): 使用明確的 Intl.NumberFormat 格式化，確保輸出固定且美觀
    if (mounted) {
      // 使用明確的 'en-US' locale 和 'USD' 貨幣，確保無論客戶端地區設定如何，輸出格式一致
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // 移除小數點
      }).format(totalPrice);
    }

    // SSR 階段 (mounted = false): 渲染不變的原始價格，避免水合作用不一致
    return rawPriceString;
  };

  return (
    <aside className="lg:w-80 flex-shrink-0">
      <div className="sticky top-10 p-6 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">立即預訂</h2>

        <div className="flex justify-between items-end mb-4 border-b pb-4">
          <span className="text-sm text-gray-600">總金額 (含稅)</span>
          {/* 使用 renderFormattedPrice */}
          <span className="text-4xl font-extrabold text-[#303D49]">
            {renderFormattedPrice()}
          </span>
        </div>

        {/* 表單區塊 */}
        <div className="space-y-4 text-gray-700">
          {/* 入住日期 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              入住日期
            </label>
            <input
              type="date"
              value={formData.checkIn}
              onChange={(e) => onInputChange('checkIn', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            />
          </div>

          {/* 退房日期 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              退房日期
            </label>
            <input
              type="date"
              value={formData.checkOut}
              onChange={(e) => onInputChange('checkOut', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            />
          </div>

          {/* 住宿晚數 (僅顯示，不可修改) */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Moon size={16} className="text-gray-500" />
              住宿晚數
            </label>
            {/* 這裡使用 div 顯示，確保它是只讀的 */}
            <div className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700">
              {formData.nights} 晚
            </div>
          </div>

          {/* 住宿人數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              住宿人數
            </label>
            <select
              value={formData.guests}
              onChange={(e) =>
                onInputChange('guests', parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} 人
                </option>
              ))}
            </select>
          </div>

          {/* 房間數 */}
          <div>
            <label className="text-sm font-medium block mb-1 flex items-center gap-2">
              <Users size={16} className="text-gray-500" />
              房間數
            </label>
            <select
              value={formData.rooms}
              onChange={(e) => onInputChange('rooms', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-[#DCBB87] focus:ring-1 focus:ring-[#DCBB87] transition"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} 間
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 右側摘要 */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>飯店名稱</span>
            <span className="font-medium">{hotel.name}</span>
          </div>

          <div className="flex justify-between">
            <span>床型需求</span>
            <span>{formData.roomType}</span>
          </div>

          <div className="flex justify-between">
            <span>入住</span>
            <span>{formData.checkIn}</span>
          </div>

          <div className="flex justify-between">
            <span>退房</span>
            <span>{formData.checkOut}</span>
          </div>

          <div className="flex justify-between">
            <span>住宿晚數</span>
            <span className="font-semibold text-[#DCBB87]">
              {formData.nights} 晚
            </span>
          </div>

          <div className="flex justify-between">
            <span>人數</span>
            <span>{formData.guests} 人</span>
          </div>

          <div className="flex justify-between">
            <span>房間數</span>
            <span>{formData.rooms} 間</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>總金額</span>
            {/* 使用 renderFormattedPrice 處理水合作用問題 */}
            <span className="text-[#DCBB87]">{renderFormattedPrice()}</span>
          </div>
        </div>

        {/* 按鈕 */}
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full mt-6 py-3 bg-[#1F2E3C] text-white font-bold text-lg rounded-lg hover:bg-[#2e445b] transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {isSubmitting ? '處理中...' : '前往付款'}
        </button>

        <p className="text-xs text-center text-gray-500 mt-3">
          點擊確認預訂即表示您同意我們的服務條款
        </p>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-gray-700">
          <p className="font-semibold mb-1">Free cancellation</p>
          <p>入住前 24 小時可免費取消</p>
        </div>
      </div>
    </aside>
  );
}
