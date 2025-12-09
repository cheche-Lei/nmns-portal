'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HotelBookingStepper } from '../../../components/HotelBookingStepper';
import { mockHotelDetailData } from '../../../interfaces/HotelDetailData';
import { convertHotelToDetailData } from '../../../interfaces/hotelUtils';
import { allMockHotels } from '../../../interfaces/mockHotels';

export default function PaymentSuccessPage() {
  const router = useRouter();

  // ✅ 使用 state 來管理 bookingData，避免 hydration mismatch
  const [bookingData, setBookingData] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  // ✅ 在 useEffect 中讀取 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('booking_final') || '{}');
      setBookingData(data);
    }
    setMounted(true);
  }, []);

  const hotelRaw = allMockHotels.find((h) => h.id === bookingData.hotelId);
  const hotel = hotelRaw
    ? convertHotelToDetailData(hotelRaw)
    : mockHotelDetailData;

  // 從 bookingData 中提取所需的數據，並設定合理的預設值
  const formData = {
    checkIn: bookingData.checkIn || '2025-11-20',
    checkOut: bookingData.checkOut || '2025-11-22',
    nights: bookingData.nights || 2,
    guests: bookingData.guests || 2,
    rooms: bookingData.rooms || 1,
    roomType: bookingData.roomType || 'King Size Bed',
    smokingPreference: bookingData.smokingPreference || '禁菸房',
  };

  // 修正總金額計算: 單價 * 晚數 * 房間數
  const totalPrice =
    (hotel?.price || 0) * (formData.nights || 1) * (formData.rooms || 1);

  const renderTotalPrice = () => {
    if (!mounted) {
      return `$${totalPrice.toString()}`;
    }
    return `$${totalPrice.toLocaleString()}`;
  };

  // ✅ 等待 mounted 再渲染內容
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/50 bg-blend-darken flex items-center justify-center">
        <div className="text-white animate-pulse">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/50 bg-blend-darken flex flex-col items-center px-6 py-12">
      {/* 步驟條 */}
      <div className="w-full max-w-6xl">
        <HotelBookingStepper currentStep={3} />
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md text-center mt-8">
        <h2 className="text-2xl font-bold text-[#D4A574] mb-4">預訂成功！</h2>
        <p className="text-gray-700 mb-6">
          感謝您的預訂，確認信件將寄送至您的信箱。
        </p>

        <Image
          src={hotel?.images?.[1] || '/images/hotel/default.jpeg'}
          alt={hotel?.name || 'Hotel'}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <div className="space-y-3 text-gray-700 text-sm mb-6 text-left">
          <div className="flex justify-between">
            <span>飯店名稱</span>
            <span className="font-medium">{hotel?.name || '未知飯店'}</span>
          </div>
          {/* ✅ 顯示床型需求 */}
          <div className="flex justify-between">
            <span>床型需求</span>
            <span>{formData.roomType}</span>
          </div>
          {/* ✅ 顯示吸煙偏好 */}
          <div className="flex justify-between">
            <span>吸煙偏好</span>
            <span>{formData.smokingPreference}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              入住
            </span>
            <span>{formData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              退房
            </span>
            <span>{formData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Moon size={14} />
              住宿晚數
            </span>
            <span>{formData.nights} 晚</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Users size={14} />
              人數
            </span>
            <span>{formData.guests} 人</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Users size={14} />
              房間數
            </span>
            <span>{formData.rooms} 間</span>
          </div>

          <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-gray-900">
            <span>總金額</span>
            <span>{renderTotalPrice()}</span>
          </div>
        </div>

        <button
          onClick={() => router.push('/hotel-booking')}
          className="w-full py-3 bg-[#1F2E3C] text-white font-bold rounded-lg hover:bg-[#2d3d4c] transition"
        >
          返回首頁
        </button>
      </div>
    </div>
  );
}
