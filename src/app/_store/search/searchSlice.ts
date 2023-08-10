import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchQuery: string;
  isSearchVisible: boolean;
}

const initialState: SearchState = {
  searchQuery: '',
  isSearchVisible: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleSearchVisibility: (state) => {
      state.isSearchVisible = !state.isSearchVisible;
    },
    showSearch: (state) => {
      state.isSearchVisible = true;
    },
    hideSearch: (state) => {
      state.isSearchVisible = false;
    },
  },
});

export const {
  setSearchQuery,
  toggleSearchVisibility,
  showSearch,
  hideSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
