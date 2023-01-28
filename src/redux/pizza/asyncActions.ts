import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPizzaSliceItem } from './types';

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
