'use client';

import { MouseEvent, FC } from 'react';
import styles from './Join.module.scss';

interface JoinProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Join: FC<JoinProps> = ({ onClick }) => (
  <button type="button" className={styles.join} onClick={onClick}>
    Join
  </button>
);

export default Join;
