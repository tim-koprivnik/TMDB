'use client';

import {
  useState,
  useEffect,
  useRef,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { HiTrendingUp } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Trending.module.scss';
import useFetch from '../../../_hooks/useFetch';
import { removeDuplicates } from '../../../_utils/helpers';
import { setSearchQuery } from '../../../_store/search/searchSlice';
import { RootState } from '../../../_store/store';

interface TrendingResult {
  id: number;
  title?: string;
  name?: string;
  [key: string]: unknown;
}

interface TrendingData {
  results: TrendingResult[];
}

// const { MOVIEDB_API_KEY = '' } = process.env;
const MOVIEDB_API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || '';

interface TrendingProps {
  onItemClick: (query: string) => void;
  showTrending: boolean;
  setShowTrending: Dispatch<SetStateAction<boolean>>;
}

const Trending: FC<TrendingProps> = ({
  onItemClick,
  showTrending,
  setShowTrending,
}) => {
  const [trendingItems, setTrendingItems] = useState<TrendingResult[]>([]);
  const trendingRef = useRef<null | HTMLDivElement>(null);
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const dispatch = useDispatch();

  const url = searchQuery
    ? `https://api.themoviedb.org/3/search/multi?api_key=${MOVIEDB_API_KEY}&query=${searchQuery}`
    : `https://api.themoviedb.org/3/trending/all/day?api_key=${MOVIEDB_API_KEY}`;

  const { data, loading, error } = useFetch<TrendingData>(url);

  const handleItemClick = (item: TrendingResult) => {
    const title = item.title || item.name || '';
    onItemClick(title);
    dispatch(setSearchQuery(title));
    setShowTrending(false);
  };

  useEffect(() => {
    if (!loading && !error && data && data.results) {
      const newItems = searchQuery
        ? removeDuplicates<TrendingResult>(data.results, 'title', 'name').slice(
            0,
            12
          )
        : data.results.slice(0, 10);
      setTrendingItems(newItems);
    }
  }, [searchQuery, data, loading, error]);

  return showTrending ? (
    <div className={styles.trending} ref={trendingRef}>
      {!searchQuery && (
        <div className={styles['trending-heading']}>
          <h2>
            <HiTrendingUp size={20} /> Trending
          </h2>
        </div>
      )}
      <ul className={searchQuery ? `${styles['has-top-border']}` : ''}>
        {trendingItems.map((item: TrendingResult) => (
          <li key={item.id}>
            <button
              type="button"
              aria-label={item.title || item.name}
              onClick={() => handleItemClick(item)}
            >
              <span>
                <FaSearch size={12} />
              </span>
              {item.title || item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Trending;