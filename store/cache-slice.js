
// src/cacheSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cache: {}, 
  error: null
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.cache[action.payload.key] = action.payload.data; 
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.error = action.payload.error;
    }
  }
});

export const { fetchDataSuccess, fetchDataFailure } = cacheSlice.actions;

export default cacheSlice.reducer;
