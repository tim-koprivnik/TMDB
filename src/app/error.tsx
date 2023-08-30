'use client';

import { useRouter } from 'next/navigation';
import PageWrapper from './_components/UI/page-wrapper/PageWrapper';
import Main from './_layouts/main/Main';
import { IoArrowBackOutline } from 'react-icons/io5';
import styles from './ErrorPage.module.scss';

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
        <h2>Something went wrong!</h2>
        <div className={styles['error-actions']}>
          <button onClick={() => reset()}>Try again</button>
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
