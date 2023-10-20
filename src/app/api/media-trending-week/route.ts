import { NextResponse } from 'next/server';
import { MOVIEDB_BASE_URL, MOVIEDB_API_KEY } from '../../_store/media/mediaApi';

interface ErrorResponse {
  status_message: string;
}
interface ResponseData {
  [key: string]: any;
}

export async function GET<T = ResponseData>(): Promise<NextResponse<T>> {
  try {
    const res = await fetch(
      `${MOVIEDB_BASE_URL}/trending/all/week?api_key=${MOVIEDB_API_KEY}`
    );
    const data = (await res.json()) as T;

    if (!res.ok) {
      throw new Error(
        (data as ErrorResponse).status_message || 'Failed to fetch data'
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    ) as NextResponse<T>;
  }
}
