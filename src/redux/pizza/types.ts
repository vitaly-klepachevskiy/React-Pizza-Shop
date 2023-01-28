export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
}

export interface IPizzaSliceState {
  items: IPizzaSliceItem[];
  status: Status;
}
