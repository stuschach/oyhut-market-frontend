import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';
import bakeryReducer from './slices/bakerySlice';
import bakeryCartReducer from './slices/bakeryCartSlice';
import backendReducer from './slices/backendSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    ui: uiReducer,
    bakery: bakeryReducer,
    bakeryCart: bakeryCartReducer,
    backend: backendReducer,
  },
});

// Save bakery cart to localStorage whenever it changes
store.subscribe(() => {
  const state = store.getState();
  try {
    const serializedState = JSON.stringify({
      items: state.bakeryCart.items
    });
    localStorage.setItem('bakeryCart', serializedState);
  } catch {
    // Ignore write errors
  }
});