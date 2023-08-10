'use client';

import { FC, ReactNode } from 'react';
import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, className = '' }) => (
  <div className={`${styles['page-wrapper']} ${className}`}>{children}</div>
);

export default PageWrapper;
