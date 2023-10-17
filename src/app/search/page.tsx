import { NextRequest } from 'next/server';
import { GET } from '../api/search/route';
import SearchPageClient from './client';

export default async function SearchPage(request: NextRequest) {
  const data = await GET(request);
  return <SearchPageClient data={data} />;
}
