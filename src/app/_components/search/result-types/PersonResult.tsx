'use client';

import { FC, SyntheticEvent, useState } from 'react';
import Image from 'next/image';
import styles from '../results/SearchResults.module.scss';

interface PersonResult {
  profile_path?: string;
  name?: string;
  title?: string;
  known_for_department?: string;
  known_for?: { title?: string; name?: string }[];
}

interface PersonResultProps {
  result: PersonResult;
}

const PersonResult: FC<PersonResultProps> = ({ result }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://image.tmdb.org/t/p/w500${result.profile_path}`
  );

  return (
    <div className={styles['result-person']}>
      <div className={styles.image}>
        <Image
          src={imgSrc}
          alt={result.title || result.name || ''}
          width={500}
          height={500}
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            setImgSrc('/assets/images/placeholder-profile-image.png');
          }}
          priority
        />
      </div>
      <div className={styles.content}>
        <h3>{result.name}</h3>
        <div className={styles['known-for']}>
          <p>
            {result.known_for_department}
            {result.known_for && result.known_for.length > 0 && ' • '}
            {result.known_for &&
              result.known_for.map(item => item.title || item.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonResult;
