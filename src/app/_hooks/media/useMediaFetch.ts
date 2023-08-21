'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useFetchMediaQuery,
  useFetchGenresQuery,
  Media,
} from '../../_store/media/mediaApi';
import {
  setMedia,
  setTotalPages,
  setGenres,
} from '../../_store/media/mediaSlice';

interface MediaFetchProps {
  mediaType: string;
  activeSort: string;
  activeFilter: number[];
  page: number;
  shouldFetchMedia: boolean;
  media: Media[];
}

const useMediaFetch = ({
  mediaType,
  page,
  shouldFetchMedia,
  activeSort,
  activeFilter,
  media,
}: MediaFetchProps) => {
  const dispatch = useDispatch();

  const shouldSkipQuery = !mediaType || !shouldFetchMedia;

  const {
    data: mediaData,
    error: mediaError,
    isError: isMediaError,
    isLoading: isMediaLoading,
  } = useFetchMediaQuery(
    {
      mediaType,
      activeSort,
      activeFilter,
      page,
    },
    { skip: shouldSkipQuery }
  );

  const {
    data: genresData,
    error: genresError,
    isError: isGenresError,
    isLoading: isGenresLoading,
  } = useFetchGenresQuery({ mediaType });

  const isLoading = isMediaLoading || isGenresLoading;
  const error = mediaError || genresError;
  const isError = isMediaError || isGenresError;

  useEffect(() => {
    if (mediaData && !mediaError) {
      let newMediaList = [];
      if (page === 1) {
        newMediaList = mediaData.results;
      } else {
        const newResults = mediaData.results.filter(
          result => !media.some(mediaItem => mediaItem.id === result.id)
        );
        newMediaList = [...media, ...newResults];
      }

      if (
        newMediaList.length !== media.length ||
        !newMediaList.every((item, index) => item.id === media[index].id)
      ) {
        dispatch(setTotalPages(mediaData.totalPages));
        dispatch(setMedia(newMediaList));
      }
    }
  }, [mediaData, mediaError, dispatch, media, page]);

  useEffect(() => {
    if (genresData && !genresError) {
      dispatch(setGenres(genresData.genres));
    }
  }, [genresData, genresError, dispatch]);

  return { isLoading, isError, error };
};

export default useMediaFetch;
