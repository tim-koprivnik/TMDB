'use client';

import { FC, useState, useEffect } from 'react';
import useFetch from '../../../_hooks/useFetch';
import Slider from './Slider';

interface SliderData {
  results: {
    id: number;
    poster_path: string;
    title: string;
    name: string;
    release_date: string;
    first_air_date: string;
    media_type: string;
  }[];
}

interface SingleSliderProps {
  title: string;
  baseURL: string;
  apiKey: string;
  tabs: { name: string; endpoint: string }[];
}

const SingleSlider: FC<SingleSliderProps> = ({
  title,
  baseURL,
  apiKey,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [url, setUrl] = useState(
    `${baseURL}${activeTab.endpoint}?api_key=${apiKey}`
  );

  useEffect(() => {
    setUrl(`${baseURL}${activeTab.endpoint}?api_key=${apiKey}`);
  }, [activeTab, baseURL, apiKey]);

  const { data, loading, error } = useFetch<SliderData>(url);
  const results = data?.results;

  return (
    <Slider
      title={title}
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      data={results}
      loading={loading}
      error={error}
    />
  );
};

export default SingleSlider;
