import { NextRequest } from 'next/server';
import type { Metadata } from 'next';
import { GET } from '../api/media/route';
import PopularMediaPageClient from './client';

export const metadata: Metadata = {
  title: 'TMDB - Popular Media',
  description: 'Popular media for movies, TV shows, people, and more.',
};

export default async function PopularMediaPage(request: NextRequest) {
  const response = await GET(request);
  const data = await response.json();
  return <PopularMediaPageClient data={data} />;
}
