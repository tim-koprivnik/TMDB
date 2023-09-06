'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';
import PageWrapper from './_components/UI/page-wrapper/PageWrapper';
import Main from './_layouts/main/Main';
import styles from './ErrorPage.module.scss';

export default function NotFound() {
  const router = useRouter();

  const message = 'Could not find requested resource.';

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <PageWrapper>
      <Main className={styles['error-page']}>
        <p>{message}</p>
        <button type="button" onClick={handleNavigateBack}>
          <IoArrowBackOutline size={18} />
          Go back
        </button>
      </Main>
    </PageWrapper>
  );
}
