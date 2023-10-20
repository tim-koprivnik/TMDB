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
): Promise<NextResponse<T>> {
  let searchParams;
  if (request.nextUrl) {
    searchParams = request.nextUrl.searchParams;
  }
  const mediaType = searchParams?.get('mediaType');
  const apiKey = process.env.MOVIEDB_API_KEY;

  if (!mediaType) {
    return NextResponse.json(
      { error: 'Missing mediaType parameter' },
      { status: 400 }
    ) as NextResponse<T>;
  }

  try {
    const res = await fetch(
      `${MOVIEDB_BASE_URL}/genre/${mediaType}/list?api_key=${apiKey}`
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
