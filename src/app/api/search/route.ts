import { NextResponse } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || 'multi';
  const apiKey = process.env.MOVIEDB_API_KEY;

  try {
    const res = await fetch(
      `${MOVIEDB_BASE_URL}/search/${category}?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.status_message || 'Failed to fetch data');
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
