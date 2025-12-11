// app/layout.tsx
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import 'styled-jsx/css';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';

export const metadata: Metadata = {
  title: '科博館',
  description: 'NMNS Official Website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="fixed top-0 left-0 w-full bg-primary-gradient z-header">
            <Container>
              <Header />
            </Container>
          </header>
          <main className="mt-18 md:mt-25">
            <Container>{children}</Container>
          </main>
        </div>
        <footer className="bg-primary-gradient">
          <Container>
            <Footer />
          </Container>
        </footer>
      </body>
    </html>
  );
}
