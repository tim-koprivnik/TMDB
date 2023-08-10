'use client';

import { ReactNode, FC } from 'react';
import styles from './Main.module.scss';

interface MainProps {
  children: ReactNode;
  className?: string;
}

const Main: FC<MainProps> = ({ children, className = '' }) => (
  <main className={`${styles.main} ${className}`}>{children}</main>
);

export default Main;
