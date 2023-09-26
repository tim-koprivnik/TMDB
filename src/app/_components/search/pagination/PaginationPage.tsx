'use client';

import styles from './Pagination.module.scss';
import { FC } from 'react';

interface PaginationPageProps {
  page: number | string;
  isActive: boolean;
  onClick: (page: number | string) => void;
}

const PaginationPage: FC<PaginationPageProps> = ({
  page,
  isActive,
  onClick,
}) => {
  if (page === '...') {
    return <span>{page}</span>;
  }

  return (
    <button
      type="button"
      className={isActive ? styles.active : ''}
      onClick={() => onClick(page)}
    >
      {page}
    </button>
  );
};

export default PaginationPage;
