'use client';

import styles from './MediaDetailsPage.module.scss';
import { SyntheticEvent, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import useFetch from '../../_hooks/useFetch';
import { formatRuntime, formatDate } from '../../_utils/helpers';
import { IoListSharp } from 'react-icons/io5';
import { AiFillHeart, AiFillStar } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import UserScore from '../../_components/UI/user-score/UserScore';
import Tooltip from '../../_components/UI/tooltip/Tooltip';
import Loader from '../../_components/UI/loader/Loader';
import ErrorMessage from '../../_components/UI/error-message/ErrorMessage';
import PageWrapper from '../../_components/UI/page-wrapper/PageWrapper';
import { Genre } from '../../_store/media/mediaApi';
import Main from '../../_layouts/main/Main';

interface Part {
  title: string;
  name: string;
}

interface MediaDetailsData {
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  release_date: string;
  first_air_date: string;
  original_language: string;
  genres: Genre[];
  vote_average: number;
  tagline: string;
  overview: string;
  parts: Part[];
  runtime?: number;
  episode_run_time?: number[];
}

interface MediaDetailsPageClientProps {
  data: any;
}

export default function MediaDetailsPageClient({
  data,
}: MediaDetailsPageClientProps) {
  const { mediaType: rawMediaType, id: rawId } = useParams();
  const mediaType = rawMediaType as string;
  const id = rawId as string;
  const url = `/api/media-details?mediaType=${mediaType}&id=${id}`;

  const {
    data: details,
    loading,
    error,
  } = useFetch<MediaDetailsData | null>(url);

  const [imgSrc, setImgSrc] = useState('');
  useEffect(() => {
    if (details?.poster_path) {
      setImgSrc(`https://image.tmdb.org/t/p/w500${details.poster_path}`);
    } else {
      setImgSrc('/assets/images/placeholder-media-details-image.png');
    }
  }, [details?.poster_path]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return <ErrorMessage fullScreen>{error.message}.</ErrorMessage>;
  }

  if (!details || ('success' in details && !details.success)) {
    return <ErrorMessage fullScreen>No data found.</ErrorMessage>;
  }

  const darkLinearGradient =
    'linear-gradient(rgba(0,0,0, 0.6), rgba(0, 0, 0, 0.6))';
  const backgroundImage = details?.backdrop_path
    ? `${
        mediaType === 'movie' ? darkLinearGradient : darkLinearGradient
      }, url(https://image.tmdb.org/t/p/w500${details?.backdrop_path})`
    : '';
  const backgroundColor = !details?.backdrop_path ? 'rgb(5,37,65, 0.8)' : '';
  const title = details?.title || details?.name;
  const releaseDate = details?.release_date || details?.first_air_date;

  return (
    <PageWrapper className={styles['media-details-page']}>
      <Main>
        <div
          className={styles.hero}
          style={{
            backgroundImage,
            backgroundColor,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
          }}
        >
          <div className={styles['hero-wrapper']}>
            <div>
              <Image
                src={imgSrc}
                alt={details?.title}
                width={500}
                height={750}
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                  setImgSrc('/assets/images/placeholder-movie-image.jpeg');
                }}
                priority
              />
            </div>
            <div>
              <h1>
                {title}{' '}
                <span>
                  {releaseDate &&
                    `(${formatDate(releaseDate, false).slice(-4)})`}
                </span>
              </h1>
              <div className={styles.info}>
                {mediaType === 'movie' && (
                  <p>
                    {formatDate(releaseDate, false)} (
                    {details?.original_language?.toUpperCase()})
                  </p>
                )}
                <p>
                  {details?.genres &&
                    details?.genres.map(genre => genre.name).join(', ')}
                </p>
                <p className={styles.runtime}>
                  {mediaType && formatRuntime(mediaType, details)}
                </p>
              </div>
              <div className={styles.actions}>
                <UserScore score={details?.vote_average} />
                <Tooltip content="Login to create and edit custom lists">
                  <IoListSharp />
                </Tooltip>
                <Tooltip content="Login to add this movie to your favorite list">
                  <AiFillHeart />
                </Tooltip>
                <Tooltip content="Login to add this movie to your watchlist">
                  <BsFillBookmarkFill />
                </Tooltip>
                <Tooltip content="Login to rate this movie">
                  <AiFillStar />
                </Tooltip>
              </div>
              <em className={styles.tagline}>{details?.tagline}</em>
              <h2>Overview</h2>
              <p>
                {details?.overview
                  ? details?.overview
                  : "We don't have an overview translated in English. Help us expand our database by adding one."}
              </p>
              {details?.parts && (
                <h4>
                  Number of movies: <span>{details?.parts.length}</span>
                </h4>
              )}
            </div>
          </div>
        </div>
      </Main>
    </PageWrapper>
  );
}
