import React from 'react';
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import BurgersPage from "./pages/BurgersPage";
import DrinksPage from "./pages/DrinksPage";
import ComboPage from "./pages/ComboPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

import RegisterPage from "./pages/RegisterPage"; 
import LoginPage from "./pages/LoginPage";
import AllProducts from './pages/AllProducts';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        

        <Route path="/" element={<BurgersPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/foods/burgers" element={<BurgersPage />} />
        <Route path="/foods/drinks" element={<DrinksPage />} />
        <Route path="/foods/combo" element={<ComboPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Authentification */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;