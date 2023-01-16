import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectFilter,
  setCategoryId,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectorPizzaData } from '../redux/slices/pizzaSlice';
import Categories from '../components/categories';
import Sort, { popupList } from '../components/sort';
import { Skeleton, PizzaBlock } from '../components/pizzaBlock';
import qs from 'qs';
// import { Pagination } from '../components/pagination';

const Home = () => {
  const { items, status } = useSelector(selectorPizzaData);

  const { categoryId, sortType, searchValue } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const [currentPage, setCurrentPage] = useState(0);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortType = popupList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sortType,
        })
      );

      isSearch.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, searchValue]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza) => (
      <Link key={pizza.id} to={`/pizza/${pizza.id}`}>
        <PizzaBlock {...pizza} />
      </Link>
    ));
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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Пиццы не могут быть загружены 😕</h2>
          <p>Проверьте подключение к интернету</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}

      {/* <Pagination onChangePage={(pageIndex) => setCurrentPage(pageIndex)} /> */}
    </div>
  );
};

export default Home;
