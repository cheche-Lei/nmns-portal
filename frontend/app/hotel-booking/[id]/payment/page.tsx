'use client';

import { useRouter } from 'next/navigation';
import { HotelBookingStepper } from '../../components/HotelBookingStepper';
import OrderPage, { FormDataType } from '../../components/OrderPage';

export default function PaymentPage() {
  const router = useRouter();

  const handlePayment = (formData: FormDataType) => {
    const hotelId = localStorage.getItem('booking_final')
      ? JSON.parse(localStorage.getItem('booking_final') || '{}').hotelId
      : '1';
    router.push(`/hotel-booking/${hotelId}/payment/success`);
  };

  return (
    <div className="min-h-screen bg-[url('/images/hotel/bg2.jpeg')] bg-cover bg-center sm:bg-top bg-no-repeat bg-black/50 bg-blend-darken flex flex-col items-center px-6 py-12">
      {/* 步驟條 */}
      <div className="w-full max-w-6xl">
        <HotelBookingStepper currentStep={2} />
      </div>

      {/* OrderPage 保留原本版型 */}
      <div className="w-full max-w-6xl mt-8">
        <OrderPage
          pageTitle="付款資訊"
          buttonText="確認付款"
          onSubmit={handlePayment}
        />
      </div>
      {/* 上一步按鈕 */}
      <div className="w-full max-w-6xl text-start mt-4">
        <button
          onClick={() => router.back()}
          className="border-2 border-[#DCBB87] hover:bg-[#DCBB87] text-white font-semibold px-8 py-1 rounded-full transition-all hover:shadow-lg active:scale-95"
        >
          上一步
        </button>
      </div>
    </div>
  );
}
