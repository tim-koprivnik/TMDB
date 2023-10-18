'use client';

import styles from './Filters.module.scss';
import { FC } from 'react';
import { Genre } from '../../../_store/media/mediaApi';
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import Card from '../card/Card';

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
      <button type="button" onClick={handleFiltersHeaderClick}>
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
