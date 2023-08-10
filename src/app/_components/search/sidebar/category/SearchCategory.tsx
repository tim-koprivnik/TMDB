'use client';

import { FC } from 'react';
import styles from './SearchCategory.module.scss';
import { formatCount } from '../../../../_utils/helpers';

interface SearchCategoryProps {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
}

const SearchCategory: FC<SearchCategoryProps> = ({
  label,
  count,
  selected,
  onClick,
}) => (
  <li
    className={`${styles['search-category']} ${
      selected ? styles.selected : ''
    }`}
  >
    <button type="button" onClick={onClick}>
      {label}
    </button>
    <span>{formatCount(count)}</span>
  </li>
);

export default SearchCategory;
