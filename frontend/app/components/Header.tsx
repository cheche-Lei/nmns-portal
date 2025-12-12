'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Container from './Container';

// export interface HeaderProps {
// }
// {  }: HeaderProps

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-logo h-8 md:h-12 aspect-square"></div>
          <div>
            <h1 className="text-xl md:text-3xl font-semibold text-white">
              國立自然科學博物館
            </h1>
            <h2
              className="text-[8px] md:text-xs text-white"
              style={{ textAlignLast: 'justify', letterSpacing: '0.1em' }}
            >
              NATIOAL MUSEUM OF NATURE SCIENCE
            </h2>
          </div>
        </div>
        {/* 手機版漢堡按鈕 */}
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <button className="IconButton">
              {menuOpen ? (
                <X className="text-xl text-white" />
              ) : (
                <Menu className="text-xl text-white" />
              )}
            </button>
          </Dialog.Trigger>

          {/* 漢堡選單內容 */}
          <Dialog.Content className="absolute left-0 top-18 md:top-25 w-full bg-neutral-gradient z-dropdown text-lg">
            <Container>
              <Dialog.Title className="hidden">導覽選單</Dialog.Title>
              {/* <div className="flex flex-col mb-6">
                <Link href="/exhibitions" onClick={() => setMenuOpen(false)}>
                  <div className="py-3 border-b border-black">展覽與劇場</div>
                </Link>
                <Link href="/visit" onClick={() => setMenuOpen(false)}>
                  <div className="py-3 border-b border-black">參觀資訊</div>
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  <div className="py-3 border-b border-black">關於博物館</div>
                </Link>
              </div> */}
              {/* <Link href="/about" onClick={() => setMenuOpen(false)}>
                <div className="py-3 border border-black text-center mb-3">
                  會員中心
                </div>
              </Link> */}
              <div className="flex flex-col mb-6 gap-2">
                <Link href="/exhibitions" onClick={() => setMenuOpen(false)}>
                  <div className="p-3 bg-glassmorphism rounded-lg">
                    展覽與劇場
                  </div>
                </Link>
                <Link href="/visit" onClick={() => setMenuOpen(false)}>
                  <div className="p-3 bg-glassmorphism rounded-lg">
                    參觀資訊
                  </div>
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  <div className="p-3 bg-glassmorphism rounded-lg">
                    關於博物館
                  </div>
                </Link>
              </div>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                <div className="py-3 bg-glassmorphism text-center rounded-lg">
                  會員中心
                </div>
              </Link>
            </Container>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
}
