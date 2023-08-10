'use client';

import { FC } from 'react';
import SingleSlider from '../UI/slider/SingleSlider';
import { MOVIEDB_BASE_URL } from '../../_store/media/mediaApi';

// const { MOVIEDB_API_KEY = '' } = process.env;
const MOVIEDB_API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || '';

const WhatsPopular: FC = () => (
  <>
    <SingleSlider
      title="Trending"
      baseURL={MOVIEDB_BASE_URL}
      apiKey={MOVIEDB_API_KEY}
      tabs={[
        { name: 'Today', endpoint: '/trending/all/day' },
        { name: 'This Week', endpoint: '/trending/all/week' },
      ]}
    />
    <SingleSlider
      title="What's Popular"
      baseURL={MOVIEDB_BASE_URL}
      apiKey={MOVIEDB_API_KEY}
      tabs={[
        { name: 'Movies', endpoint: '/movie/popular' },
        { name: 'TV Shows', endpoint: '/tv/popular' },
      ]}
    />
    <SingleSlider
      title="Free to Watch"
      baseURL={MOVIEDB_BASE_URL}
      apiKey={MOVIEDB_API_KEY}
      tabs={[
        { name: 'Movies', endpoint: '/discover/movie' },
        { name: 'TV Shows', endpoint: '/discover/tv' },
      ]}
    />
  </>
);

export default WhatsPopular;
