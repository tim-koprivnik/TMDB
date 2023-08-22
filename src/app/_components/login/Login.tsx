'use client';

import { FC, MouseEvent } from 'react';
import styles from './Login.module.scss';
import { useRouter } from 'next/navigation';

const Login: FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <button type="button" className={styles.login} onClick={handleLoginClick}>
      Login
    </button>
  );
};

export default Login;
