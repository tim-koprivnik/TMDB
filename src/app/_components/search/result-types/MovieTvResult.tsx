'use client';

import { FC, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../results/SearchResults.module.scss';
import { formatDate, generateMediaURL } from '../../../_utils/helpers';

interface MovieTvResult {
  overview?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  id: number;
}

interface MovieTvResultProps {
  result: MovieTvResult;
  category?: string;
}

const MovieTvResult: FC<MovieTvResultProps> = ({ result, category = '' }) => {
  const overview = result.overview || '';
  const truncatedOverview =
    overview.length > 200 ? `${overview.slice(0, 200)}...` : overview;
  const mediaType = result.media_type || category;

  return (
    <div className={styles['result-movie-tv']}>
      <div className={styles.image}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
          alt={result.title || result.name || ''}
          width={500}
          height={500}
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = '/assets/images/placeholder-movie-image.jpeg';
          }}
        />
      </div>
      <div className={styles.content}>
        <Link
          href={generateMediaURL(
            mediaType,
            result.id,
            result.title || result.name
          )}
        >
          <h3>{result.title || result.name}</h3>
        </Link>
        <p className={styles.date}>
          {formatDate(result.release_date || result.first_air_date)}
        </p>
        <p>{truncatedOverview}</p>
      </div>
    </div>
  );
};

export default MovieTvResult;
