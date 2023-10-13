import { NextResponse, NextRequest } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('query') || '';
  const MOVIEDB_API_KEY = process.env.MOVIEDB_API_KEY;

  const url = searchQuery
    ? `${MOVIEDB_BASE_URL}/search/multi?api_key=${MOVIEDB_API_KEY}&query=${searchQuery}`
    : `${MOVIEDB_BASE_URL}/trending/all/day?api_key=${MOVIEDB_API_KEY}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
