'use client';

import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchResults.module.scss';
import useFetch from '../../../_hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../_store/store';
import Pagination from '../pagination/Pagination';
import MovieTvResult from '../result-types/MovieTvResult';
import PersonResult from '../result-types/PersonResult';
import CompanyResult from '../result-types/CompanyResult';
import CollectionResult from '../result-types/CollectionResult';
import KeywordResult from '../result-types/KeywordResult';

// const { MOVIEDB_API_KEY = '' } = process.env;
const MOVIEDB_API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || '';

interface SearchResult {
  id: number;
  media_type: string;
  name?: string;
}

interface SearchResultData {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

interface SearchResultsProps {
  selectedCategory?: string;
  currentPage?: number;
  setCurrentPage?: (page: number | string) => void;
}

const SearchResults: FC<SearchResultsProps> = ({
  selectedCategory = '',
  currentPage = 1,
  setCurrentPage,
}) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const router = useRouter();

  let message = 'There are no results that matched your query.';

  if (selectedCategory) {
    message = `There are no ${selectedCategory} that matched your query.`;
  }

  const categoryFilter = selectedCategory === '' ? 'multi' : selectedCategory;
  const { data, loading, error } = useFetch<SearchResultData>(
    `https://api.themoviedb.org/3/search/${categoryFilter}?api_key=${MOVIEDB_API_KEY}&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`
  );

  const handlePageChange = (newPage: number | string) => {
    setCurrentPage?.(newPage);
    router.replace(
      `/search/${selectedCategory}?page=${newPage}&query=${searchQuery}`
    );
  };

  useEffect(() => {
    if (searchQuery && !loading && !error && data && data.results) {
      setResults(data.results);
      setTotalPages(Math.ceil(data.total_results / 20));
    }
  }, [searchQuery, selectedCategory, currentPage, data, loading, error]);

  const renderResult = (result: SearchResult, index: number) => {
    const category = result.media_type || selectedCategory;

    if (['movie', 'tv'].includes(category)) {
      return <MovieTvResult result={result} category={selectedCategory} />;
    }

    if (category === 'collection') {
      return <CollectionResult result={result} category={selectedCategory} />;
    }

    if (category === 'company') {
      return (
        <CompanyResult result={result} index={index} total={results.length} />
      );
    }

    if (category === 'keyword') {
      return <KeywordResult result={result} />;
    }

    if (category === 'person') {
      return <PersonResult result={result} />;
    }

    return null;
  };

  return (
    <>
      <div className={styles['search-results']}>
        {results.length === 0 ? (
          <p>{message}</p>
        ) : (
          results.map((result, index) => (
            <div key={result.id} className={styles['search-result']}>
              {renderResult(result, index)}
            </div>
          ))
        )}
      </div>
      {results.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default SearchResults;
