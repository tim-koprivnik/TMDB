'use client';

import styles from './Search.module.scss';
import {
  useState,
  useMemo,
  useRef,
  FC,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../_store/search/searchSlice';
import { RootState } from '../../_store/store';
import { debounce } from '../../_utils/helpers';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import SearchModal from './modal/SearchModal';

interface SearchProps {
  showSearchIcon?: boolean;
  showTrending?: boolean;
}

const Search: FC<SearchProps> = ({
  showSearchIcon = false,
  showTrending = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [showTrendingItems, setShowTrendingItems] = useState(showTrending);
  const searchQueryFromURL = searchParams.get('query');
  const [inputValue, setInputValue] = useState(searchQueryFromURL || '');

  const inputRef = useRef<HTMLInputElement>(null);

  const searchIconColor = useMemo(() => ({ color: '#04A1CF' }), []);
  const closeIconColor = useMemo(() => ({ color: 'white' }), []);

  const handleShowModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleHideModal = () => {
    setIsOpen(false);
  };

  const debouncedUpdateUrl = useMemo(
    () =>
      debounce((search: string) => {
        router.replace(`/search?query=${encodeURIComponent(search)}`);
      }, 300),
    [router]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setShowTrendingItems(value !== '');
    setInputValue(value);

    if (pathname === '/search') {
      debouncedUpdateUrl(value);
    }
  };

  const handleInputClick = () => {
    setShowTrendingItems(true);
  };

  const handleClearInput = () => {
    setShowTrendingItems(false);
    dispatch(setSearchQuery(''));
    setInputValue('');
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowTrendingItems(false);
    dispatch(setSearchQuery(inputValue));
    router.replace(`/search?query=${encodeURIComponent(inputValue)}`);
  };

  const handleTrendingItemClick = (query: string) => {
    setShowTrendingItems(false);
    dispatch(setSearchQuery(query));
    router.replace(`/search/?query=${encodeURIComponent(query)}`);
  };

  useEffect(
    () => () => {
      dispatch(setSearchQuery(''));
    },
    [dispatch]
  );

  useEffect(
    () => () => {
      setInputValue('');
    },
    [isOpen]
  );

  useEffect(() => {
    setInputValue(searchQueryFromURL || '');
  }, [searchQueryFromURL]);

  return (
    <div className={styles.search}>
      {showSearchIcon ? (
        <button type="button" onClick={handleShowModal} aria-label="Search">
          {!isOpen && (
            <IconContext.Provider value={searchIconColor}>
              <FaSearch size={20} />
            </IconContext.Provider>
          )}
          {isOpen && (
            <IconContext.Provider value={closeIconColor}>
              <IoClose size={30} />
            </IconContext.Provider>
          )}
        </button>
      ) : null}

      {(isOpen || !showSearchIcon) && (
        <SearchModal
          onClose={handleHideModal}
          onInputChange={handleInputChange}
          onClearInput={handleClearInput}
          onFormSubmit={handleFormSubmit}
          onInputClick={handleInputClick}
          onItemClick={handleTrendingItemClick}
          showTrending={showTrendingItems}
          setShowTrending={setShowTrendingItems}
          inputRef={inputRef}
          inputValue={inputValue}
        />
      )}
    </div>
  );
};

export default Search;
