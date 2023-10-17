import { NextRequest } from 'next/server';
import { GET } from '../../api/multi-search/route';
import SearchPageWithCategoryClient from './client';

export default async function SearchPage(request: NextRequest) {
  const data = await GET(request);
  return <SearchPageWithCategoryClient data={data} />;
}
