'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { setSearchQuery } from '../../_store/search/searchSlice';
import { RootState } from '../../_store/store';
import useFetchMultiple from '../../_hooks/useFetchMultiple';

// const { MOVIEDB_API_KEY = '' } = process.env;
const MOVIEDB_API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || '';

export interface CategoryCounts {
  movie: number;
  tv: number;
  person: number;
  collection: number;
  company: number;
  keyword: number;
}

export interface CategoryData {
  total_results: number;
}

export const categories = [
  'movie',
  'tv',
  'person',
  'collection',
  'company',
  'keyword',
];

export const useSearchLogic = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryCounts, setCategoryCounts] = useState({
    movie: 0,
    tv: 0,
    person: 0,
    collection: 0,
    company: 0,
    keyword: 0,
  });

  const reduxSearchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );
  const searchQueryFromURL = searchParams.get('query');
  const searchQuery = searchQueryFromURL || reduxSearchQuery || '';

  const urls = categories.map(
    category =>
      `https://api.themoviedb.org/3/search/${category}?api_key=${MOVIEDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  );

  const { data, loading, error } = useFetchMultiple(urls, [searchQuery]);

  const handleCategoryClick = (category: string) => {
    setCurrentPage(1);
    const updatedPath = `/search/${category}?query=${searchQuery}`;
    if (pathname !== updatedPath) {
      router.push(updatedPath);
    }
  };

  useEffect(() => {
    if (data && !loading && !error) {
      const initialCounts: CategoryCounts = {
        movie: 0,
        tv: 0,
        person: 0,
        collection: 0,
        company: 0,
        keyword: 0,
      };
      const newCategoryCounts: CategoryCounts = (data as CategoryData[]).reduce(
        (prev, curr: CategoryData, index) => ({
          ...prev,
          [categories[index]]: curr.total_results,
        }),
        initialCounts
      );

      setCategoryCounts(newCategoryCounts);
    }
  }, [data, loading, error]);

  useEffect(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [searchQuery, dispatch]);

  return {
    searchQuery,
    handleCategoryClick,
    categoryCounts,
    currentPage,
    setCurrentPage,
  };
};
