'use client';

import { FC, useState, useEffect } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SearchPage.module.scss';
import PageWrapper from '../_components/UI/page-wrapper/PageWrapper';
import Main from '../_layouts/main/Main';
import Sidebar from '../_layouts/sidebar/Sidebar';
import SearchSidebar from '../_components/search/sidebar/SearchSidebar';
import SearchResults from '../_components/search/results/SearchResults';
import Search from '../_components/search/Search';
import { setSearchQuery } from '../_store/search/searchSlice';
import { RootState } from '../_store/store';
import useFetchMultiple from '../_hooks/useFetchMultiple';

const MOVIEDB_API_KEY = process.env.NEXT_PUBLIC_MOVIEDB_API_KEY || '';

interface CategoryCounts {
  movie: number;
  tv: number;
  person: number;
  collection: number;
  company: number;
  keyword: number;
}

interface CategoryData {
  total_results: number;
}

const categories = [
  'movie',
  'tv',
  'person',
  'collection',
  'company',
  'keyword',
];

const SearchPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({
    movie: 0,
    tv: 0,
    person: 0,
    collection: 0,
    company: 0,
    keyword: 0,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const searchQuery = searchParams.get('query') || '';

  const urls = categories.map(
    category =>
      `https://api.themoviedb.org/3/search/${category}?api_key=${MOVIEDB_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const pageParam = currentPage === 1 ? '' : `&page=${currentPage}`;
    router.replace(`/search/${category}?query=${searchQuery}${pageParam}`);
  };

  const { data, loading, error } = useFetchMultiple(urls, [searchQuery]);

  useEffect(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [searchQuery, dispatch]);

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

  return (
    <>
      <Search showTrending setSelectedCategory={setSelectedCategory} />
      <PageWrapper className={styles['search-page']}>
        <Sidebar>
          <SearchSidebar
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
            categoryCounts={categoryCounts}
          />
          <div className={styles['search-tip']}>
            <BsInfoCircleFill className={styles['info-icon']} size={18} />
            <p>
              Tip: You can use the 'y:' filter to narrow your results by year.
              Example: 'star wars y:1977'.
            </p>
          </div>
        </Sidebar>
        <Main>
          <SearchResults
            selectedCategory={selectedCategory}
            currentPage={currentPage}
            setCurrentPage={(page: string | number) =>
              setCurrentPage(Number(page))
            }
          />
        </Main>
      </PageWrapper>
    </>
  );
};

export default SearchPage;
