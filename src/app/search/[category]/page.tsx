import { NextRequest } from 'next/server';
import type { Metadata } from 'next';
import { GET } from '../../api/multi-search/route';
import SearchPageWithCategoryClient from './client';

export const metadata: Metadata = {
  title: 'TMDB - Search by Category',
  description: 'Search for movies, TV shows, people, and more.',
};

export default async function SearchPage(request: NextRequest) {
  const response = await GET(request);
  const data = await response.json();
  return <SearchPageWithCategoryClient data={data} />;
}
