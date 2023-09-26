'use client';

import styles from './Loader.module.scss';
import { FC } from 'react';
import ReactDOM from 'react-dom';

interface LoaderProps {
  className?: string;
  fullScreen?: boolean;
}

const Loader: FC<LoaderProps> = ({ className = '', fullScreen = false }) => {
  const loader = (
    <div
      className={`${styles['loader-wrap']} ${className} ${
        fullScreen ? styles['full-screen'] : ''
      }`}
    >
      {' '}
      <div className={styles.loader} />
    </div>
  );

  return fullScreen ? ReactDOM.createPortal(loader, document.body) : loader;
};

export default Loader;
