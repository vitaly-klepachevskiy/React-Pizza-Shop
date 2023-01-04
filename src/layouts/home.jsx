import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/categories';
import Sort from '../components/sort';
import { Skeleton, PizzaBlock } from '../components/pizzaBlock';
// import { Pagination } from '../components/pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { categoryId, sortType } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(0);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const category = categoryId ? `category=${categoryId}` : '';

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63a83f85100b7737b97a80c8.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, category, sortBy, order]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeleton = [...new Array(6)].map((_, skeletonIndex) => (
    <Skeleton key={skeletonIndex} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      {/* <Pagination onChangePage={(pageIndex) => setCurrentPage(pageIndex)} /> */}
    </div>
  );
};

export default Home;
