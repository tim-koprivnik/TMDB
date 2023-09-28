import { NextResponse } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mediaType = searchParams.get('mediaType');
  const apiKey = process.env.MOVIEDB_API_KEY;

  if (!mediaType) {
    return NextResponse.json(
      { error: 'Missing mediaType parameter' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${MOVIEDB_BASE_URL}/genre/${mediaType}/list?api_key=${apiKey}`
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
