'use client';

import styles from './SearchForm.module.scss';
import {
  RefObject,
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from 'react';
import { RootState } from '../../../_store/store';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface SearchFormProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: FormEvent) => void;
  onInputClick: () => void;
  onClearInput: () => void;
  setShowTrending: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
  inputValue: string;
}

const SearchForm: FC<SearchFormProps> = ({
  onInputChange,
  onFormSubmit,
  onInputClick,
  onClearInput,
  setShowTrending,
  inputRef,
  inputValue,
}) => {
  const searchQuery = useSelector(
    (state: RootState) => state.search.searchQuery
  );

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowTrending(false);
    }, 200);
  };

  const handleInputFocus = () => {
    if (searchQuery !== '') {
      setShowTrending(true);
    }
  };

  return (
    <form className={styles['search-form']} onSubmit={onFormSubmit}>
      <FaSearch />
      <div className={styles['input-wrapper']}>
        <input
          type="text"
          placeholder="Search for a movie, tv show, person..."
          aria-label="Search for movies or TV shows"
          value={inputValue}
          ref={inputRef}
          onChange={onInputChange}
          onClick={onInputClick}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {searchQuery && (
          <IoClose
            size={20}
            className={styles['close-icon']}
            onClick={onClearInput}
          />
        )}
      </div>
    </form>
  );
};

export default SearchForm;
