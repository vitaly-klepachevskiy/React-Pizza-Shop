import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Cart, Home, NotFound, FullPizza } from './layouts';
import MainLayout from './layouts/mainLayout';
import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
