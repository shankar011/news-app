import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './features/newSlice'; // Adjust the import path as necessary

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
