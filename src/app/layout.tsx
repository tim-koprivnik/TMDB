import './globals.css';
import './index.scss';
import type { Metadata } from 'next';
import { sourceSans } from './fonts';
import ReduxProvider from './providers';
import Header from './_layouts/header/Header';
import Footer from './_layouts/footer/Footer';

export const metadata: Metadata = {
  title: 'TMDB',
  description: 'Movie database app built with Next.js',
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
