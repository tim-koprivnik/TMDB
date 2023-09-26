'use client';

import styles from '../results/SearchResults.module.scss';
import { FC } from 'react';

interface CompanyResult {
  name?: string;
}

interface CompanyResultProps {
  result: CompanyResult;
  index: number;
  total: number;
}

const CompanyResult: FC<CompanyResultProps> = ({ result, index, total }) => (
  <div className={styles['result-company']}>
    <p
      className={`${index === 0 ? styles.firstCompanyResult : ''} ${
        index === total - 1 ? styles.lastCompanyResult : ''
      }`}
    >
      {result.name}
    </p>
  </div>
);

export default CompanyResult;
