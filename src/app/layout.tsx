import './globals.css';
import './index.scss';
import type { Metadata } from 'next';
import { sourceSans } from './fonts';
import ReduxProvider from './_store/provider';
import Header from './_layouts/header/Header';
import Footer from './_layouts/footer/Footer';

export const metadata: Metadata = {
  title: 'TMDB Movie app',
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
