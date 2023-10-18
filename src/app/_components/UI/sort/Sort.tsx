'use client';

import styles from './Sort.module.scss';
import { FC } from 'react';
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import Select from '../select/Select';
import Card from '../card/Card';

export interface SortOption {
  code: string;
  label: string;
}

interface SortProps {
  isSortVisible?: boolean;
  activeSort: string;
  handleSortHeaderClick: () => void;
  handleSortChange: (option: SortOption) => void;
}

const Sort: FC<SortProps> = ({
  isSortVisible = false,
  activeSort = '',
  handleSortHeaderClick,
  handleSortChange,
}) => {
  const sortOptions: SortOption[] = [
    { code: 'popularity.desc', label: 'Popularity Descending' },
    { code: 'popularity.asc', label: 'Popularity Ascending' },
    { code: 'vote_average.desc', label: 'Rating Descending' },
    { code: 'vote_average.asc', label: 'Rating Ascending' },
  ];

  return (
    <Card
      className={`${styles.sort} ${!isSortVisible ? styles.collapsed : ''}`}
    >
      <h2>
        <button type="button" onClick={handleSortHeaderClick}>
          Sort{' '}
          <span>
            {' '}
            {isSortVisible ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
          </span>
        </button>
      </h2>
      {isSortVisible && (
        <>
          <label htmlFor="sort">Sort Results By</label>
          <Select
            id="sort"
            options={sortOptions}
            value={activeSort}
            onValueChange={handleSortChange}
            showInput={false}
            className={styles.select}
          />
        </>
      )}
    </Card>
  );
};

export default Sort;
