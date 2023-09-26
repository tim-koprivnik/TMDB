'use client';

import styles from './Pagination.module.scss';
import { FC } from 'react';
import { getPages } from '../../../_utils/helpers';
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import PaginationPage from './PaginationPage';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | string) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button type="button" onClick={() => onPageChange(currentPage - 1)}>
          <GrFormPreviousLink className={styles.icon} />
          Previous
        </button>
      )}
      {pages.map(page => (
        <PaginationPage
          key={`page-${page}`}
          page={page}
          isActive={page === currentPage}
          onClick={onPageChange}
        />
      ))}
      {currentPage < totalPages && (
        <button type="button" onClick={() => onPageChange(currentPage + 1)}>
          Next
          <GrFormNextLink className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
