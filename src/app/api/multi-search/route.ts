import { NextResponse, NextRequest } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

export async function GET(request: NextRequest) {
  let searchParams;
  if (request.nextUrl) {
    searchParams = request.nextUrl.searchParams;
  }
  const query = searchParams?.get('query');
  const apiKey = process.env.MOVIEDB_API_KEY;

  const categories = [
    'movie',
    'tv',
    'person',
    'collection',
    'company',
    'keyword',
  ];

  try {
    const fetchData = async (category: string) => {
      const res = await fetch(
        `${MOVIEDB_BASE_URL}/search/${category}?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.status_message || 'Failed to fetch data');
      }

      return data;
    };

    const data = await Promise.all(categories.map(fetchData));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
