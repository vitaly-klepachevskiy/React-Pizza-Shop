export type Sort = {
  name: string;
  sortProperty: string;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  sortType: Sort;
}
