import { NextResponse, NextRequest } from 'next/server';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

export async function GET(request: NextRequest) {
  let searchParams;
  if (request.nextUrl) {
    searchParams = request.nextUrl.searchParams;
  }
  const mediaType = searchParams?.get('mediaType');
  const id = searchParams?.get('id');
  const apiKey = process.env.MOVIEDB_API_KEY;

  if (!mediaType || !id) {
    return NextResponse.json(
      { error: 'Missing mediaType or id parameter' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${MOVIEDB_BASE_URL}/${mediaType}/${id}?api_key=${apiKey}&language=en-US`
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
