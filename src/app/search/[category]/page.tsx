'use client';

import { BsInfoCircleFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../_store/search/searchSlice';
import { RootState } from '../../_store/store';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import {
  categories,
  CategoryCounts,
  CategoryData,
} from '../../_hooks/search/useSearchLogic';
import { useSearchLogic } from '../../_hooks/search/useSearchLogic';
import styles from './SearchPage.module.scss';
import PageWrapper from '../../_components/UI/page-wrapper/PageWrapper';
import Main from '../../_layouts/main/Main';
import Sidebar from '../../_layouts/sidebar/Sidebar';
import SearchSidebar from '../../_components/search/sidebar/SearchSidebar';
import SearchResults from '../../_components/search/results/SearchResults';
import Search from '../../_components/search/Search';

export default function SearchPageWithCategory() {
  const {
    searchQuery,
    handleCategoryClick,
    categoryCounts,
    currentPage,
    setCurrentPage,
  } = useSearchLogic();

  const params = useParams();
  const selectedCategory = (params.category as string) || '';

  return (
    <>
      <Search showTrending />
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
}
