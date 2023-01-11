import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/header';
import { Cart, Home, NotFound } from './layouts';
import './scss/app.scss';

export const SearchContext = createContext();

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
