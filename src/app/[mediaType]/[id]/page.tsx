import type { Metadata } from 'next';
import { GET } from '../../api/media-details/route';
import MediaDetailsPageClient from './client';

export const metadata: Metadata = {
  title: 'TMDB - Media Details',
  description: 'Media details for movies, TV shows, people, and more.',
};

export default async function MediaDetailsPage(request: any) {
  const response = await GET(request);
  const data = await response.json();
  return <MediaDetailsPageClient data={data} />;
}
