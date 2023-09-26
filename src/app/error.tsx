'use client';

import styles from './ErrorPage.module.scss';
import { useRouter } from 'next/navigation';
import Main from './_layouts/main/Main';
import PageWrapper from './_components/UI/page-wrapper/PageWrapper';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <PageWrapper>
      <Main className={styles['error-page']}>
        <p>Something went wrong.</p>
        <div className={styles['error-actions']}>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
          <span className={styles.divider}>/</span>
          <button type="button" onClick={handleNavigateBack}>
            <IoArrowBackOutline size={18} />
            Go back
          </button>
        </div>
      </Main>
    </PageWrapper>
  );
}
