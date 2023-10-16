import 'server-only';

import { NextResponse } from 'next/server';
import { MOVIEDB_BASE_URL, MOVIEDB_API_KEY } from '../../_store/media/mediaApi';

export async function GET() {
  try {
    const res = await fetch(
      `${MOVIEDB_BASE_URL}/tv/popular?api_key=${MOVIEDB_API_KEY}`
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
