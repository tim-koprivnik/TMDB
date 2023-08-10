import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './media/mediaSlice';
import searchReducer from './search/searchSlice';
import mediaApi from './media/mediaApi';

const store = configureStore({
  reducer: {
    [mediaApi.reducerPath]: mediaApi.reducer,
    media: mediaReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mediaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
