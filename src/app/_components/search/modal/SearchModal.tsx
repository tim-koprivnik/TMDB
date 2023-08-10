'use client';

import {
  useEffect,
  FC,
  RefObject,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './SearchModal.module.scss';
import Modal from '../../UI/modal/Modal';
import SearchForm from '../form/SearchForm';
import Trending from '../trending/Trending';

interface SearchModalProps {
  onClose: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: FormEvent) => void;
  onInputClick: () => void;
  onClearInput: () => void;
  onItemClick: (query: string) => void;
  showTrending?: boolean;
  setShowTrending: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
}

const SearchModal: FC<SearchModalProps> = ({
  onClose,
  onInputChange,
  onFormSubmit,
  onInputClick,
  onClearInput,
  onItemClick,
  showTrending = false,
  setShowTrending,
  inputRef,
  inputValue,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/search')) {
      setShowTrending(false);
    }
  }, [pathname, setShowTrending]);

  return (
    <Modal onClose={onClose} className={styles['search-modal']}>
      <div className={styles['search-modal-content']}>
        <SearchForm
          onInputChange={onInputChange}
          onFormSubmit={onFormSubmit}
          onInputClick={onInputClick}
          onClearInput={onClearInput}
          inputRef={inputRef}
          setShowTrending={setShowTrending}
          inputValue={inputValue}
        />
        {showTrending && (
          <Trending
            onItemClick={onItemClick}
            showTrending={showTrending}
            setShowTrending={setShowTrending}
          />
        )}
      </div>
    </Modal>
  );
};

export default SearchModal;
