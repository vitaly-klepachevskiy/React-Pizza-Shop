import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectorPizzaData } from '../redux/pizza/selectors';
import Categories from '../components/categories';
import Sort, { popupList } from '../components/sort';
import { Skeleton, PizzaBlock } from '../components/pizzaBlock';
import qs from 'qs';
// import { Pagination } from '../components/pagination';

const Home: React.FC = () => {
  const { items, status } = useSelector(selectorPizzaData);

  const { categoryId, sortType, searchValue } = useSelector(selectFilter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // const [currentPage, setCurrentPage] = useState(0);

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortType = popupList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      if (sortType) {
        dispatch(
          setFilters({
            ...params,
            sortType,
            searchValue: '',
            categoryId: 0,
          })
        );
      }

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
    .filter((obj: any) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeleton = [...new Array(6)].map((_, skeletonIndex) => (
    <Skeleton key={skeletonIndex} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>?????????? ???? ?????????? ???????? ?????????????????? ????</h2>
          <p>?????????????????? ?????????????????????? ?? ??????????????????</p>
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
