import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { ICartItem, ICartSliceState } from './types';

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: ICartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(
      state,
      action: PayloadAction<{ id: string; price: number; count: number }>
    ) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem && findItem.count > 0) {
        findItem.count--;
      }
      state.totalPrice = state.totalPrice - action.payload.price;
    },
    removeItem(
      state,
      action: PayloadAction<{ id: string; price: number; count: number }>
    ) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice =
        state.totalPrice - action.payload.price * action.payload.count;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
