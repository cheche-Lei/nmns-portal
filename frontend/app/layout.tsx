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
          <header className="bg-primary-gradient">
            <Container>
              <Header />
            </Container>
          </header>
          <main>
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
