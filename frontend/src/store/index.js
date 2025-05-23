import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

export const setData = createAction('SET_DATA');
export const setFilter = createAction('SET_FILTER');

const initialState = {
  data: [],
  filter: ''
};

const csvReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setData, (state, action) => {
      state.data = action.payload;
    })
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    });
});

export const store = configureStore({
  reducer: {
    csv: csvReducer
  }
});