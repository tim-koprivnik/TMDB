import { NextResponse, NextRequest } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

interface ErrorResponse {
  status_message: string;
}
interface ResponseData {
  [key: string]: any;
}

export async function GET<T = ResponseData>(
  request: NextRequest
): Promise<NextResponse<T[] | T>> {
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
    const fetchData = async (category: string): Promise<T> => {
      const res = await fetch(
        `${MOVIEDB_BASE_URL}/search/${category}?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = (await res.json()) as T;

      if (!res.ok) {
        throw new Error(
          (data as ErrorResponse).status_message || 'Failed to fetch data'
        );
      }

      return data;
    };

    const data = await Promise.all(categories.map(fetchData));
    return NextResponse.json(data) as NextResponse<T[]>;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    ) as NextResponse<T>;
  }
}
