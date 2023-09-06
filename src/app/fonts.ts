import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({ subsets: ['latin'] });

export const sourceSans = localFont({
  src: './_fonts/SourceSans3-Regular.ttf.woff2',
  display: 'swap',
});
