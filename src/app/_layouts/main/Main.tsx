'use client';

import styles from './Main.module.scss';
import { ReactNode, FC } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

const Main: FC<MainProps> = ({ children, className = '' }) => (
  <main className={`${styles.main} ${className}`}>{children}</main>
);

export default Main;
