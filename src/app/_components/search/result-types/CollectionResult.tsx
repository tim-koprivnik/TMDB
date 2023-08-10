'use client';

import { FC, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../results/SearchResults.module.scss';
import { generateMediaURL } from '../../../_utils/helpers';

interface CollectionResult {
  overview?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  description?: string;
  media_type?: string;
  id: number;
}

interface CollectionResultProps {
  result: CollectionResult;
  category?: string;
}

const CollectionResult: FC<CollectionResultProps> = ({
  result,
  category = '',
}) => {
  const overview = result.overview || '';
  const truncatedOverview =
    overview.length > 200 ? `${overview.slice(0, 200)}...` : overview;
  const mediaType = result.media_type || category;

  return (
    <div className={styles['result-collection']}>
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
        <Link href={generateMediaURL(mediaType, result.id, result.name)}>
          <h3>{result.name}</h3>
        </Link>
        <p>{result.description || truncatedOverview}</p>
      </div>
    </div>
  );
};

export default CollectionResult;
