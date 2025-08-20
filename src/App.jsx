import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import BakeryCartDrawer from './components/bakery/BakeryCartDrawer';
import PrivateRoute from './components/auth/PrivateRoute';
import PasswordProtect from './components/PasswordProtect';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import BakeryPage from './pages/BakeryPage';
import BakeryProductDetailPage from './pages/BakeryProductDetailPage';
import BakeryCartPage from './pages/BakeryCartPage';
import BakeryCheckoutPage from './pages/BakeryCheckoutPage';
import BakeryOrdersPage from './pages/BakeryOrdersPage';
import BeerWinePage from './pages/BeerWinePage';
import GuestOrderTrackingPage from './pages/GuestOrderTrackingPage';

import { fetchCart } from './store/slices/cartSlice';
import { checkBackend } from './store/slices/backendSlice';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isAvailable: backendAvailable } = useSelector((state) => state.backend);

  // Check backend availability on mount
  useEffect(() => {
    dispatch(checkBackend());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && backendAvailable) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated, backendAvailable]);

  // Comment out this line to disable password protection
  const enablePasswordProtection = true;

  const appContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/bakery" element={<BakeryPage />} />
          <Route path="/bakery/products/:id" element={<BakeryProductDetailPage />} />
          <Route path="/bakery/cart" element={<BakeryCartPage />} />
          <Route path="/bakery/checkout" element={<BakeryCheckoutPage />} />
          <Route path="/beer-wine" element={<BeerWinePage />} />
          <Route path="/track-order" element={<GuestOrderTrackingPage />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/bakery/orders" element={<BakeryOrdersPage />} />
          </Route>
          
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Box>
      <Footer />
      <CartDrawer />
      <BakeryCartDrawer />
    </Box>
  );

  return enablePasswordProtection ? (
    <PasswordProtect>{appContent}</PasswordProtect>
  ) : (
    appContent
  );
}

export default App;