'use client';

import * as Accordion from '@radix-ui/react-accordion';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import navData from '../../src/data/nav';
import Container from './Container';

// export interface HeaderProps {
// }
// {  }: HeaderProps

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // 功能：先跳轉頁面，再關閉選單
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          <Dialog.Overlay className="fixed inset-0 mt-18 md:mt-25 bg-black/50" />
          {/* 漢堡選單內容 */}
          <Dialog.Content className="absolute left-0 top-18 md:top-25 w-full max-h-125 overflow-y-auto bg-neutral-gradient z-dropdown text-lg">
            <Container>
              <Dialog.Title className="hidden">導覽選單</Dialog.Title>
              <Accordion.Root
                type="single"
                // defaultValue="item-1"
                collapsible
                className="flex flex-col gap-2"
              >
                {navData.map((item, index) => (
                  <Accordion.Item
                    key={index}
                    value={`item-${index + 1}`}
                    className="bg-glassmorphism rounded-lg"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="accordion-trigger flex justify-between items-center w-full p-3 text-left">
                        {item.title}
                        <ChevronDown className="accordion-chevron w-4 h-4 transition-transform duration-200" />
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="flex flex-col gap-1 mb-2">
                      {item.children.map((child, idx) => (
                        <Link
                          key={idx}
                          href={child.href}
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(child.href);
                          }}
                        >
                          <div className="px-6 py-3 rounded-lg">
                            {child.title}
                          </div>
                        </Link>
                      ))}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>

              <Link
                href="/member"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/member');
                }}
              >
                <div className="py-3 bg-glassmorphism text-center rounded-lg mt-4">
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
