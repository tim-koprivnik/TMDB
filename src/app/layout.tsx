import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './index.scss';
import ReduxProvider from './_store/provider';
import Header from './_layouts/header/Header';
import Footer from './_layouts/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

const sourceSans = localFont({
  src: './_fonts/SourceSans3-Regular.ttf.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TMDBNext',
  description: 'Next.js onboarding',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
