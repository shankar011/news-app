import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = "d0727afadbf3479ca13969dadcd3dfa2";

export const fetchNewsArticles = createAsyncThunk(
  'news/fetchNewsArticles',
  async ({ category, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&apiKey=${apiKey}`);
      return response.data.articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  articles: [],
  status: 'idle',
  currentPage: 1,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewsArticles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = action.payload;
      })
      .addCase(fetchNewsArticles.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const { setPage } = newsSlice.actions;

export default newsSlice.reducer;
