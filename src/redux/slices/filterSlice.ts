import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
  name: string;
  sortProperty: string;
};

interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  sortType: Sort;
}

const initialState: IFilterSliceState = {
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sortType = action.payload.sortType;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sortType;

export const { setCategoryId, setSort, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
