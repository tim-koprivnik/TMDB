'use client';

import styles from './Join.module.scss';
import { MouseEvent, FC } from 'react';
import { useRouter } from 'next/navigation';

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
