import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './layouts/home';
import './scss/app.scss';

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ './layouts/cart')
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './layouts/notFound')
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './layouts/fullPizza')
);
const MainLayout = React.lazy(
  () => import(/* webpackChunkName: "MainLayout" */ './layouts/mainLayout')
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path=""
          element={
            <React.Suspense fallback={<h2>Pizzas are loading...</h2>}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<h2>Cart is loading...</h2>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<h2>Pizza is loading...</h2>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
