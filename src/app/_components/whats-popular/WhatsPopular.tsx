'use client';

import { FC } from 'react';
import SingleSlider from '../UI/slider/SingleSlider';

const WhatsPopular: FC = () => (
  <>
    <SingleSlider
      title="Trending"
      tabs={[
        { name: 'Today', endpoint: '/media-trending-today' },
        { name: 'This Week', endpoint: '/media-trending-week' },
      ]}
    />
    <SingleSlider
      title="What's Popular"
      tabs={[
        { name: 'Movies', endpoint: '/movies-popular' },
        { name: 'TV Shows', endpoint: '/tv-popular' },
      ]}
    />
    <SingleSlider
      title="Free to Watch"
      tabs={[
        { name: 'Movies', endpoint: '/movies-discover' },
        { name: 'TV Shows', endpoint: '/tv-discover' },
      ]}
    />
  </>
);

export default WhatsPopular;
