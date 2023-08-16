'use client';

import { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  fullScreen?: boolean;
}

const Loader: FC<LoaderProps> = ({ className = '', fullScreen = false }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // This will be executed only on client-side. 'use client' is not enough for some reason.
    setIsBrowser(true);
  }, []);

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

  if (isBrowser && fullScreen) {
    return ReactDOM.createPortal(loader, document.body);
  }

  return loader;
};

export default Loader;

// 'use client';

// import { FC } from 'react';
// import ReactDOM from 'react-dom';
// import styles from './Loader.module.scss';

// interface LoaderProps {
//   className?: string;
//   fullScreen?: boolean;
// }

// const Loader: FC<LoaderProps> = ({ className = '', fullScreen = false }) => {
//   const loader = (
//     <div
//       className={`${styles.loaderWrap} ${className} ${
//         fullScreen ? styles.fullScreen : ''
//       }`}
//     >
//       {' '}
//       <div className={styles.loader} />
//     </div>
//   );

//   return fullScreen ? ReactDOM.createPortal(loader, document.body) : loader;
// };

// export default Loader;
