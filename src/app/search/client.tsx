'use client';

import styles from './SearchPage.module.scss';
import { useSearchLogic } from '../_hooks/search/useSearchLogic';
import { BsInfoCircleFill } from 'react-icons/bs';
import Main from '../_layouts/main/Main';
import Sidebar from '../_layouts/sidebar/Sidebar';
import PageWrapper from '../_components/UI/page-wrapper/PageWrapper';
import SearchSidebar from '../_components/search/sidebar/SearchSidebar';
import SearchResults from '../_components/search/results/SearchResults';
import Search from '../_components/search/Search';

interface SearchPageClientProps {
  data: any;
}

export default function SearchPageClient({ data }: SearchPageClientProps) {
  const { handleCategoryClick, categoryCounts, currentPage, setCurrentPage } =
    useSearchLogic();

  return (
    <>
      <Search showTrending />
      <PageWrapper className={styles['search-page']}>
        <Sidebar>
          <SearchSidebar
            onCategoryClick={handleCategoryClick}
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
