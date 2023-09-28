import { NextResponse } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaType = searchParams.get('mediaType');
  const activeSort = searchParams.get('activeSort');
  const activeFilter = searchParams.get('activeFilter');
  const page = searchParams.get('page');
  const apiKey = process.env.MOVIEDB_API_KEY;

  if (!mediaType) {
    return NextResponse.json(
      { error: 'Missing mediaType parameter' },
      { status: 400 }
    );
  }

  const url = `${MOVIEDB_BASE_URL}/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=${activeSort}&with_genres=${activeFilter}&page=${page}`;

  try {
    const res = await fetch(url);
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
