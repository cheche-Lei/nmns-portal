'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { Menu } from 'lucide-react';
import { useState } from 'react';

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
        <Menu className="text-xl text-white" />
        <Collapsible.Root>
          <Collapsible.Trigger />
          <Collapsible.Content />
        </Collapsible.Root>
      </div>
    </>
  );
}
