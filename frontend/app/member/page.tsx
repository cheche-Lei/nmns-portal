'use client';

// import React, { useState, useEffect } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import memberFeatureData from '../../src/data/memberFeature';

// export interface MemberPageProps {

// }
// {  }: MemberPageProps

export default function MemberPage() {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* 個人資訊 */}
        <section className="w-full px-4 py-8 lg:flex-1 flex flex-col items-center bg-dark-green-gradient text-white rounded-xl shadow-[0_25px_45px_rgba(0,0,0,0.1)]">
          {/* 頭貼 */}
          <Avatar.Root className="w-30 h-30 rounded-full overflow-hidden flex justify-center items-center select-none">
            <Avatar.Image
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="李小明"
            />
            <Avatar.Fallback delayMs={600}>LM</Avatar.Fallback>
          </Avatar.Root>
          {/* 姓名及等級 */}
          <div className="mt-2 ">Member Page</div>
          <div className="">金卡會員</div>
          {/* 儀錶板數字 */}
          <div className="mt-8 w-full max-w-100 flex">
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl font-bold">1000</div>
              <div className="mt-2 text-center">
                累積<br></br>紅利點數
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl font-bold">2</div>
              <div className="mt-2 text-center">
                即將到來<br></br>的行程
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="text-2xl font-bold">5</div>
              <div className="mt-2 text-center">
                累積<br></br>進館次數
              </div>
            </div>
          </div>
          {/* 虛擬會員卡 */}
          <div className="mt-8 w-full max-w-100">
            <button className="w-full text-center p-4 border border-white rounded-lg hover:bg-white/10">
              虛擬會員卡
            </button>
          </div>
        </section>
        {/* 功能入口 */}
        <section className="lg:flex-2">
          {memberFeatureData.map((f, index) => (
            <Link href={`/member/${f.id}`} key={index}>
              <div className="p-4 rounded-xl bg-glassmorphism flex items-center mb-2">
                {f.title}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
