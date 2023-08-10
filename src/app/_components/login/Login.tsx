'use client';

import { FC, MouseEvent } from 'react';
import styles from './Login.module.scss';

interface LoginProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Login: FC<LoginProps> = ({ onClick }) => (
  <button type="button" className={styles.login} onClick={onClick}>
    Login
  </button>
);

export default Login;
