'use client';

import { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SwiperCore, { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './swiper.css';
import styles from './Slider.module.scss';
import { formatTitle, formatDate, getMediaType } from '../../../_utils/helpers';
const Loader = dynamic(() => import('../loader/Loader'), {
  ssr: false,
});
const ErrorMessage = dynamic(() => import('../error-message/ErrorMessage'), {
  ssr: false,
});

interface Error {
  message: string;
}

interface Slider {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
}

interface SliderProps {
  title?: string;
  tabs?: { name: string; endpoint: string }[];
  activeTab?: { name: string; endpoint: string };
  setActiveTab: Dispatch<SetStateAction<{ name: string; endpoint: string }>>;
  data?: Slider[];
  loading?: boolean;
  error?: Error | null;
}

SwiperCore.use([Navigation, Scrollbar, A11y]);

const Slider: FC<SliderProps> = ({
  title = '',
  tabs = [],
  activeTab = { name: '', endpoint: '' },
  setActiveTab,
  data = [],
  loading = false,
  error = null,
}) => {
  const sliderSettings = {
    spaceBetween: 16,
    slidesPerView: 7,
    loop: false,
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false,
      draggable: true,
      snapOnRelease: true,
    },
  };

  const handleTabClick = (tabName: string) => {
    const tab = tabs.find(t => t.name === tabName);
    if (tab) {
      setActiveTab(tab);
    }
  };

  let content;
  if (loading) {
    content = <Loader className={styles.loader} />;
  } else if (error) {
    content = (
      <ErrorMessage className={styles['error-message']}>
        {error.message}.
      </ErrorMessage>
    );
  } else {
    content = (
      <Swiper {...sliderSettings} className={styles['swiper-slider']}>
        {data.map((item: Slider) => {
          const formattedTitle = formatTitle(item) || '';
          return (
            <SwiperSlide key={item.id}>
              <Link
                href={`/${getMediaType(item)}/${item.id}-${formattedTitle
                  .toLowerCase()
                  .replace(/ /g, '-')}`}
              >
                <Image
                  className={styles['slider-image']}
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title || item.name || ''}
                  width={500}
                  height={500}
                  onError={(e: SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src =
                      '/assets/images/placeholder-movie-image.jpeg';
                  }}
                  priority
                />
              </Link>
              <h4 className={styles['slider-heading']}>{formattedTitle}</h4>
              {item.release_date ? (
                <p className={styles['slider-text']}>
                  {formatDate(item.release_date)}
                </p>
              ) : (
                <p className={styles['slider-text']}>
                  {formatDate(item.first_air_date, true)}
                </p>
              )}
            </SwiperSlide>
          );
        })}
        <div className="swiper-scrollbar" />
      </Swiper>
    );
  }

  return (
    <div className={styles.slider}>
      <div className={styles['slider-nav']}>
        <h2 className={styles['slider-title']}>{title}</h2>
        <div className={styles['switch-tabs']}>
          {tabs.map(tab => (
            <button
              key={tab.name}
              type="button"
              className={activeTab.name === tab.name ? styles.active : ''}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      {content}
    </div>
  );
};

export default Slider;
