import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IPizzaSliceItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
}

interface IPizzaSliceState {
  items: IPizzaSliceItem[];
  status: Status;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const fetchPizzas = createAsyncThunk<
  IPizzaSliceItem[],
  Record<string, string>
>('users/fetchPizzasStatus', async (params) => {
  const { category, sortBy, order } = params;
  const { data } = await axios.get<IPizzaSliceItem[]>(
    `https://63a83f85100b7737b97a80c8.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
  );
  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IPizzaSliceItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const selectorPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
