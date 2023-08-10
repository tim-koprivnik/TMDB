'use client';

import { useDispatch } from 'react-redux';
import { SortOption } from '../../_components/UI/sort/Sort';
import {
  setActiveSort,
  setActiveFilter,
  setMedia,
  setPage,
  setShouldFetchMedia,
  setHasClickedLoadMore,
  setIsInitialLoad,
} from '../../_store/media/mediaSlice';

interface MediaHandlersProps {
  activeSort: string;
  activeFilter: number[];
  page: number;
  totalPages: number;
  lastSearchCriteria: string;
  setLastSearchCriteria: (criteria: string) => void;
}

const useMediaHandlers = ({
  activeSort,
  activeFilter,
  page,
  totalPages,
  lastSearchCriteria,
  setLastSearchCriteria,
}: MediaHandlersProps) => {
  const dispatch = useDispatch();

  const handleSortChange = (option: SortOption) => {
    dispatch(setActiveSort(option.code));
    dispatch(setIsInitialLoad(false));
    dispatch(setShouldFetchMedia(false));
  };

  const handleGenreClick = (genre: number) => {
    const newActiveFilter = activeFilter.includes(genre)
      ? activeFilter.filter(item => item !== genre)
      : [...activeFilter, genre];
    dispatch(setActiveFilter(newActiveFilter));
    dispatch(setIsInitialLoad(false));
    dispatch(setShouldFetchMedia(false));
  };

  const handleSearchClick = () => {
    const currentSearchCriteria = JSON.stringify({ activeSort, activeFilter });

    if (currentSearchCriteria === lastSearchCriteria) return;

    dispatch(setMedia([]));
    dispatch(setPage(1));
    dispatch(setShouldFetchMedia(true));
    dispatch(setHasClickedLoadMore(false));
    setLastSearchCriteria(currentSearchCriteria);
  };

  const handleLoadMoreClick = () => {
    if (page < totalPages) {
      dispatch(setShouldFetchMedia(true));
      dispatch(setHasClickedLoadMore(true));
    }
  };

  return {
    handleSortChange,
    handleGenreClick,
    handleSearchClick,
    handleLoadMoreClick,
  };
};

export default useMediaHandlers;
