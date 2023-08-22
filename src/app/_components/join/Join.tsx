'use client';

import { MouseEvent, FC } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Join.module.scss';

const Join: FC = () => {
  const router = useRouter();

  const handleJoinClick = () => {
    router.push('/join');
  };

  return (
    <button type="button" className={styles.join} onClick={handleJoinClick}>
      Join
    </button>
  );
};

export default Join;
