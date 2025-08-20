import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: localStorage.getItem('darkMode') === 'true',
    mobileMenuOpen: false,
    searchOpen: false,
    loading: false,
    notification: {
      open: false,
      message: '',
      severity: 'info',
    },
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
      };
    },
    hideNotification: (state) => {
      state.notification.open = false;
    },
  },
});

export const {
  toggleDarkMode,
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  setLoading,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer;