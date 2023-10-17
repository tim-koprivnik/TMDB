import { NextRequest } from 'next/server';
import type { Metadata } from 'next';
import { GET } from '../api/search/route';
import SearchPageClient from './client';

export const metadata: Metadata = {
  title: 'TMDB - Search',
  description: 'Search for movies, TV shows, people, and more.',
};

export default async function SearchPage(request: NextRequest) {
  const data = await GET(request);
  return <SearchPageClient data={data} />;
}
