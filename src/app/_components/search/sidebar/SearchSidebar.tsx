'use client';

import { FC } from 'react';
import styles from './SearchSidebar.module.scss';
import SearchCategory from './category/SearchCategory';

interface SearchSidebarProps {
  selectedCategory?: string;
  onCategoryClick?: (category: string) => void;
  categoryCounts?: {
    movie?: number;
    tv?: number;
    person?: number;
    collection?: number;
    company?: number;
    keyword?: number;
  };
}

const SearchSidebar: FC<SearchSidebarProps> = ({
  selectedCategory = '',
  onCategoryClick,
  categoryCounts = {},
}) => (
  <div className={styles['search-results-sidebar']}>
    <h3>Search Results</h3>
    <ul className={styles['search-categories']}>
      <SearchCategory
        label="TV Shows"
        count={categoryCounts.tv || 0}
        selected={selectedCategory === 'tv'}
        onClick={() => onCategoryClick?.('tv')}
      />
      <SearchCategory
        label="Movies"
        count={categoryCounts.movie || 0}
        selected={selectedCategory === 'movie'}
        onClick={() => onCategoryClick?.('movie')}
      />
      <SearchCategory
        label="Collections"
        count={categoryCounts.collection || 0}
        selected={selectedCategory === 'collection'}
        onClick={() => onCategoryClick?.('collection')}
      />
      <SearchCategory
        label="Keywords"
        count={categoryCounts.keyword || 0}
        selected={selectedCategory === 'keyword'}
        onClick={() => onCategoryClick?.('keyword')}
      />
      <SearchCategory
        label="People"
        count={categoryCounts.person || 0}
        selected={selectedCategory === 'person'}
        onClick={() => onCategoryClick?.('person')}
      />

      <SearchCategory
        label="Companies"
        count={categoryCounts.company || 0}
        selected={selectedCategory === 'company'}
        onClick={() => onCategoryClick?.('company')}
      />
    </ul>
  </div>
);

export default SearchSidebar;
