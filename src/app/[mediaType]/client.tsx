'use client';

import styles from './PopularMediaPage.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { RootState } from '../_store/store';
import useMediaFetch from '../_hooks/media/useMediaFetch';
import useMediaHandlers from '../_hooks/media/useMediaHandlers';
import Sidebar from '../_layouts/sidebar/Sidebar';
import Main from '../_layouts/main/Main';
import PageWrapper from '../_components/UI/page-wrapper/PageWrapper';
import Sort from '../_components/UI/sort/Sort';
import Filters from '../_components/UI/filters/Filters';
import MediaItem from '../_components/media/MediaItem';
import Loader from '../_components/UI/loader/Loader';
import ErrorMessage from '../_components/UI/error-message/ErrorMessage';

import {
  setMedia,
  setPage,
  setActiveFilter,
  setActiveSort,
  setHasClickedLoadMore,
  setMediaType,
  setShouldFetchMedia,
} from '../_store/media/mediaSlice';

interface PopularMediaPageClientProps {
  data: any;
}

export default function PopularMediaPageClient({
  data,
}: PopularMediaPageClientProps) {
  const {
    mediaType,
    media,
    page,
    totalPages,
    genres,
    activeSort,
    activeFilter,
    isInitialLoad,
    hasClickedLoadMore,
    shouldFetchMedia,
  } = useSelector((state: RootState) => state.media);

  const [isSortVisible, setIsSortVisible] = useState(
    activeSort !== 'popularity.desc'
  );
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [lastSearchCriteria, setLastSearchCriteria] = useState('');
  const loadMoreRef = useRef<HTMLButtonElement | null>(null);
  const mediaTypeRef = useRef(mediaType);
  const pageRef = useRef(page);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { isLoading, isError, error } = useMediaFetch({
    mediaType,
    activeSort,
    activeFilter,
    page,
    shouldFetchMedia,
    media,
  });

  const {
    handleSortChange,
    handleGenreClick,
    handleSearchClick,
    handleLoadMoreClick,
  } = useMediaHandlers({
    activeSort,
    activeFilter,
    page,
    totalPages,
    lastSearchCriteria,
    setLastSearchCriteria,
  });

  const handleSortHeaderClick = () => {
    setIsSortVisible(prevIsSortVisible => !prevIsSortVisible);
  };

  const handleFiltersHeaderClick = () => {
    setIsFiltersVisible(prevIsFiltersVisible => !prevIsFiltersVisible);
  };

  useEffect(() => {
    setIsSortVisible(activeSort !== 'popularity.desc');
  }, [activeSort]);

  useEffect(() => {
    const currentMediaType = pathname === '/tv' ? 'tv' : 'movie';
    if (mediaTypeRef.current !== currentMediaType) {
      dispatch(setMedia([]));
      dispatch(setActiveSort('popularity.desc'));
      dispatch(setActiveFilter([]));
      dispatch(setPage(1));
      dispatch(setMediaType(currentMediaType));
      mediaTypeRef.current = currentMediaType;
      dispatch(setHasClickedLoadMore(false));
      dispatch(setShouldFetchMedia(true));
    }
  }, [pathname, dispatch]);

  useEffect(
    () => () => {
      dispatch(setActiveSort('popularity.desc'));
      dispatch(setActiveFilter([]));
    },
    [dispatch]
  );

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      entries => {
        if (
          !isLoading &&
          hasClickedLoadMore &&
          entries[0].isIntersecting &&
          pageRef.current < totalPages
        ) {
          dispatch(setPage(pageRef.current + 1));
        }
      },
      { threshold: 0 }
    );

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasClickedLoadMore, totalPages, dispatch, isLoading]);

  let pageTitle: string;
  let mediaProperty: string;
  let releaseDateProperty: string;
  switch (mediaType) {
    case 'tv':
      pageTitle = 'Popular TV Shows';
      mediaProperty = 'name';
      releaseDateProperty = 'first_air_date';
      break;
    default:
      pageTitle = 'Popular Movies';
      mediaProperty = 'title';
      releaseDateProperty = 'release_date';
  }

  if (!pathname.startsWith('/tv') && !pathname.startsWith('/movie')) {
    return <ErrorMessage fullScreen>Not found.</ErrorMessage>;
  }

  return (
    <PageWrapper className={styles['popular-page']}>
      <Sidebar>
        <h1>{pageTitle}</h1>
        <Sort
          isSortVisible={isSortVisible}
          activeSort={activeSort}
          handleSortHeaderClick={handleSortHeaderClick}
          handleSortChange={handleSortChange}
        />
        <Filters
          isFiltersVisible={isFiltersVisible}
          genres={genres}
          activeFilter={activeFilter}
          handleFiltersHeaderClick={handleFiltersHeaderClick}
          handleGenreClick={handleGenreClick}
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className={styles['search-btn']}
          disabled={isInitialLoad}
        >
          Search
        </button>
      </Sidebar>
      <Main>
        {isLoading && <Loader fullScreen />}
        {isError && <p>Error: {JSON.stringify(error)}</p>}
        {!isLoading && !isError && !shouldFetchMedia && media.length === 0 && (
          <ErrorMessage>No results found.</ErrorMessage>
        )}
        <>
          <ul className={styles.list}>
            {media?.map(m => (
              <MediaItem
                key={`${mediaType}-${m.id}`}
                media={m}
                mediaType={mediaType}
                mediaProperty={mediaProperty}
                releaseDateProperty={releaseDateProperty}
              />
            ))}
          </ul>
          {page < totalPages && (
            <button
              type="button"
              ref={loadMoreRef}
              onClick={handleLoadMoreClick}
              style={{ opacity: hasClickedLoadMore ? 0 : 1, height: '1px' }}
            >
              Load More
            </button>
          )}
        </>
      </Main>
    </PageWrapper>
  );
}
