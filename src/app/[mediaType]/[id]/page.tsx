import { NextRequest } from 'next/server';
import type { Metadata } from 'next';
import { GET } from '../../api/media-details/route';
import MediaDetailsPageClient from './client';

export const metadata: Metadata = {
  title: 'TMDB - Media Details',
  description: 'Media details for movies, TV shows, people, and more.',
};

export default async function MediaDetailsPage(request: NextRequest) {
  const data = await GET(request);
  return <MediaDetailsPageClient data={data} />;
}
