'use client';

import { Calendar, Moon, Users } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { mockHotelDetailData } from '../interfaces/HotelDetailData';

interface OrderPageProps {
  pageTitle: string;
  buttonText: string;
  onSubmit: (formData: FormDataType) => void;
}

export interface FormDataType {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  firstName?: string;
  lastName?: string;
  paymentMethod: 'creditCard' | 'linePay';
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
}

export interface DetailType {
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  rooms: number;
  name: string;
  phone: string;
  email: string;
  roomType: string;
  smokingPreference: string;
  hotelId: number;
  hotelName: string;
  price: number;
  image: string;
}

export default function OrderPage({
  pageTitle,
  buttonText,
  onSubmit,
}: OrderPageProps) {
  const hotel = mockHotelDetailData;

  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'linePay'>(
    'creditCard'
  );

  const [formData, setFormData] = useState<FormDataType>({
    checkIn: '2025-11-20',
    checkOut: '2025-11-22',
    nights: 2,
    guests: 2,
    firstName: '',
    lastName: '',
    paymentMethod: 'creditCard',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [detail, setDetail] = useState<DetailType>({
    checkIn: '2025-11-19',
    checkOut: '2025-11-22',
    nights: 3,
    guests: 2,
    rooms: 1,
    name: '',
    phone: '0980123123',
    email: 'yun@gmail.com',
    roomType: 'King Size Bed',
    smokingPreference: '禁煙房',
    hotelId: 1,
    hotelName: '東京成田機場旅館',
    price: 3500,
    image: '/images/hotel/room1.jpeg',
  });

  const totalPrice = detail.price * detail.rooms * detail.nights;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('booking_final');
      if (saved) {
        const parsed = JSON.parse(saved);
        setDetail(parsed);
      }
    }
  }, []);

  const handleFormSubmit = () => {
    onSubmit({ ...formData, paymentMethod });
  };

  return (
    <div className="min-h-screen py-12 px-6 flex flex-col lg:flex-row justify-center gap-10">
      <style jsx>{`
        .custom-radio {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #d1d5db;
          border-radius: 50%;
          display: inline-block;
          position: relative;
          cursor: pointer;
        }
        .custom-radio:checked {
          border-color: #dcbb87;
        }
        .custom-radio:checked::after {
          content: '';
          width: 10px;
          height: 10px;
          background-color: #dcbb87;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>

      {/* 左邊 - 表單 */}
      <div className="bg-white rounded-lg shadow-md p-8 lg:w-2/3 w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          {pageTitle}
        </h2>

        {pageTitle === '付款資訊' && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              付款方式
            </h3>

            <div className="space-y-4">
              {/* 1. 信用卡付款 */}
              <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-md has-[:checked]:border-[#1F2E3C]">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === 'creditCard'}
                    onChange={() => setPaymentMethod('creditCard')}
                    className="custom-radio"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    信用卡付款
                  </span>
                </div>
                <div className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-credit-card"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
              </label>

              {/* 2. LinePay */}
              <div>
                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer transition-all hover:shadow-md has-[:checked]:border-gray-600">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="linePay"
                      checked={paymentMethod === 'linePay'}
                      onChange={() => setPaymentMethod('linePay')}
                      className="custom-radio"
                    />
                    <span className="text-lg font-medium text-gray-800">
                      LinePay
                    </span>
                  </div>
                  <div className="text-gray-600 font-bold text-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-circle"
                    >
                      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    </svg>
                  </div>
                </label>

                {paymentMethod === 'linePay' && (
                  <div className="mt-4 p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      掃描 QR Code 完成付款
                    </h4>
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/images/dutyfree/qrcode.png"
                        alt="LinePay QR Code"
                        width={192}
                        height={192}
                        className="border-2 border-gray-300 rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      請使用 LINE App 掃描此 QR Code
                    </p>
                    <p className="text-xs text-gray-500">
                      總金額:{' '}
                      <span className="font-bold text-gray-800">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {pageTitle !== '付款資訊' && (
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            聯絡人資訊
          </h3>
        )}

        {formData.lastName !== undefined && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                姓
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                名
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
              />
            </div>
          </div>
        )}

        {pageTitle === '付款資訊' && paymentMethod === 'creditCard' && (
          <div className="space-y-4 mb-6 pt-6">
            <h3 className="text-xl font-semibold text-gray-700">信用卡資訊</h3>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                信用卡號碼
              </label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
                placeholder="1234 1234 1234 1234"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                required={paymentMethod === 'creditCard'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  有效日期
                </label>
                <input
                  type="text"
                  value={formData.expiry}
                  onChange={(e) =>
                    setFormData({ ...formData, expiry: e.target.value })
                  }
                  placeholder="MM/YY"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                  required={paymentMethod === 'creditCard'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  CVC
                </label>
                <input
                  type="password"
                  value={formData.cvc}
                  onChange={(e) =>
                    setFormData({ ...formData, cvc: e.target.value })
                  }
                  placeholder="CVC code"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#DCBB87] focus:outline-none"
                  required={paymentMethod === 'creditCard'}
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleFormSubmit}
          className="w-full mt-8 py-3 bg-[#1F2E3C] text-white font-bold text-lg rounded-lg hover:bg-[#2d3d4c] transition"
        >
          {buttonText}
        </button>
      </div>

      {/* 右邊 - 訂單摘要 */}
      <aside className="bg-white rounded-lg shadow-md p-8 w-full lg:w-1/3 border border-gray-200 h-fit">
        <Image
          src={detail.image || '/images/hotel/default.jpeg'}
          alt={detail.name}
          width={400}
          height={160}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800 mb-4">訂單摘要</h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>飯店名稱</span>
            <span className="font-medium">{detail.hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span>床型需求</span>
            <span>{detail.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span>房間數</span>
            <span>{detail.rooms} 間</span>
          </div>
          <div className="flex justify-between">
            <span>吸煙偏好</span>
            <span>{detail.smokingPreference}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              入住
            </span>
            <span>{detail.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              退房
            </span>
            <span>{detail.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Moon size={14} />
              住宿晚數
            </span>
            <span>{detail.nights} 晚</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Users size={14} />
              人數
            </span>
            <span>{detail.guests} 人</span>
          </div>
          <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-900">
            <span>總金額</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
