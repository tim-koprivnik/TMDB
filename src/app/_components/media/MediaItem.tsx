'use client';

import { FC, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MediaItem.module.scss';
import { formatDate } from '../../_utils/helpers';
import { Media } from '../../_store/media/mediaApi';
import UserScore from '../UI/user-score/UserScore';
import Card from '../UI/card/Card';

interface MediaItemProps {
  media: Media;
  mediaType: string;
  mediaProperty: string;
  releaseDateProperty: string;
}

const MediaItem: FC<MediaItemProps> = ({
  media = {} as Media,
  mediaType = '',
  mediaProperty = '',
  releaseDateProperty = '',
}) => (
  <Card className={styles['media-item']}>
    <Link href={`/${mediaType}/${media.id}`}>
      <Image
        src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
        alt={media[mediaProperty]?.toString() || ''}
        width={200}
        height={280}
        onError={(e: SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src =
            '/assets/images/placeholder-media-details-image.png';
        }}
      />
    </Link>
    <div className={styles.content}>
      <UserScore score={media.vote_average} small />
      <Link href={`/${mediaType}/${media.id}`}>
        <h2 className={styles.title}>{media[mediaProperty]?.toString()}</h2>
      </Link>
      <p className={styles['release-date']}>
        {formatDate(media[releaseDateProperty]?.toString())}
      </p>
    </div>
  </Card>
);

export default MediaItem;
