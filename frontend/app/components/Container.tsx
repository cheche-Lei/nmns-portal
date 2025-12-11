'use client';

import { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode; // React 元素或字串等可渲染內容
  className?: string; // 額外的 Tailwind 或 CSS class
}

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div className={`p-4 md:p-6 max-w-[1200px] mx-auto ${className}`}>
      {children}
    </div>
  );
}
