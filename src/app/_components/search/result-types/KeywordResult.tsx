'use client';

import { FC } from 'react';
import styles from '../results/SearchResults.module.scss';

interface KeywordResult {
  name?: string;
}

interface KeywordResultProps {
  result: KeywordResult;
}

const KeywordResult: FC<KeywordResultProps> = ({ result }) => (
  <div className={styles['result-keyword']}>
    <p>{result.name}</p>
  </div>
);

export default KeywordResult;
