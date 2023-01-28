export interface ICartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface ICartSliceState {
  items: ICartItem[];
  totalPrice: number;
}
