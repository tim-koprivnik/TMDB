'use client';

import PageWrapper from './_components/UI/page-wrapper/PageWrapper';
import Main from './_layouts/main/Main';
import styles from './ErrorPage.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <PageWrapper>
      <Main className={styles['error-page']}>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </Main>
    </PageWrapper>
  );
}
