import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sortType: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sortType = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sortType;

export const { setCategoryId, setSort, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
