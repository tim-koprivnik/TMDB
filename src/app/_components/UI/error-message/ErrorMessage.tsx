'use client';

import { FC, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import ReactDOM from 'react-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  className?: string;
  fullScreen?: boolean;
  children: ReactNode;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  className = '',
  fullScreen = false,
  children,
}) => {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  const errorMessage = (
    <div
      className={`${styles['error-message-wrap']} ${className} ${
        fullScreen ? styles.fullScreen : ''
      }`}
    >
      <p className={styles['error-message']}>{children}</p>
      {fullScreen ? (
        <button
          type="button"
          className={styles.button}
          onClick={handleNavigateBack}
        >
          <IoArrowBackOutline size={18} />
          Go Back
        </button>
      ) : null}
    </div>
  );

  return fullScreen
    ? ReactDOM.createPortal(errorMessage, document.body)
    : errorMessage;
};

export default ErrorMessage;
