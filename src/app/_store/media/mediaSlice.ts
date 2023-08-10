import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, Genre } from './mediaApi';

interface MediaState {
  mediaType: string;
  media: Media[];
  page: number;
  totalPages: number;
  genres: Genre[];
  activeSort: string;
  activeFilter: number[];
  isInitialLoad: boolean;
  hasClickedLoadMore: boolean;
  shouldFetchMedia: boolean;
}

const initialState: MediaState = {
  mediaType: '',
  media: [],
  page: 1,
  totalPages: 0,
  genres: [],
  activeSort: 'popularity.desc',
  activeFilter: [],
  isInitialLoad: true,
  hasClickedLoadMore: false,
  shouldFetchMedia: true,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    setMedia: (state, action: PayloadAction<Media[]>) => {
      state.media = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<string>) => {
      state.activeSort = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<number[]>) => {
      state.activeFilter = action.payload;
    },
    setIsInitialLoad: (state, action: PayloadAction<boolean>) => {
      state.isInitialLoad = action.payload;
    },
    setHasClickedLoadMore: (state, action: PayloadAction<boolean>) => {
      state.hasClickedLoadMore = action.payload;
    },
    setMediaType: (state, action: PayloadAction<string>) => {
      state.mediaType = action.payload;
    },
    setShouldFetchMedia: (state, action: PayloadAction<boolean>) => {
      state.shouldFetchMedia = action.payload;
    },
  },
});

export const {
  setMediaType,
  setMedia,
  setPage,
  setTotalPages,
  setGenres,
  setActiveFilter,
  setActiveSort,
  setIsInitialLoad,
  setHasClickedLoadMore,
  setShouldFetchMedia,
} = mediaSlice.actions;

export default mediaSlice.reducer;
