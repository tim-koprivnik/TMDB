'use client';

import { FC } from 'react';
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import styles from './Filters.module.scss';
import Card from '../card/Card';
import { Genre } from '../../../_store/media/mediaApi';

interface FiltersProps {
  isFiltersVisible?: boolean;
  genres: Genre[];
  activeFilter?: number[];
  handleFiltersHeaderClick?: () => void;
  handleGenreClick?: (id: number) => void;
}

const Filters: FC<FiltersProps> = ({
  isFiltersVisible = true,
  genres = [],
  activeFilter = [],
  handleFiltersHeaderClick,
  handleGenreClick,
}) => (
  <Card
    className={`${styles.filters} ${!isFiltersVisible ? styles.collapsed : ''}`}
  >
    <h2>
      <button
        type="button"
        onClick={handleFiltersHeaderClick}
        aria-label="Toggle filter options"
      >
        Filters{' '}
        <span>
          {' '}
          {isFiltersVisible ? (
            <MdOutlineKeyboardArrowDown />
          ) : (
            <MdOutlineKeyboardArrowRight />
          )}
        </span>
      </button>
    </h2>
    {isFiltersVisible && (
      <>
        <label htmlFor="genres">Genres</label>
        <ul id="genres">
          {genres.map(genre => (
            <li key={genre.id}>
              <button
                type="button"
                aria-label={genre.name}
                onClick={() => handleGenreClick?.(genre.id)}
                className={activeFilter.includes(genre.id) ? styles.active : ''}
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      </>
    )}
  </Card>
);

export default Filters;
