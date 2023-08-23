'use client';

import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  fullScreen?: boolean;
}

const Loader: FC<LoaderProps> = ({ className = '', fullScreen = false }) => {
  const loader = (
    <div
      className={`${styles.loaderWrap} ${className} ${
        fullScreen ? styles.fullScreen : ''
      }`}
    >
      {' '}
      <div className={styles.loader} />
    </div>
  );

  return fullScreen ? ReactDOM.createPortal(loader, document.body) : loader;
};

export default Loader;
