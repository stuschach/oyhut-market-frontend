import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bakeryService from '../../services/bakeryService';

export const fetchBakeryProducts = createAsyncThunk(
  'bakery/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await bakeryService.getProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bakery products');
    }
  }
);

export const fetchBakeryProductById = createAsyncThunk(
  'bakery/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await bakeryService.getProductById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchBakeryCategories = createAsyncThunk(
  'bakery/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bakeryService.getCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const calculateProductPrice = createAsyncThunk(
  'bakery/calculatePrice',
  async ({ productId, customizations }, { rejectWithValue }) => {
    try {
      const response = await bakeryService.calculatePrice(productId, customizations);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to calculate price');
    }
  }
);

export const checkProductAvailability = createAsyncThunk(
  'bakery/checkAvailability',
  async ({ productId, date }, { rejectWithValue }) => {
    try {
      const response = await bakeryService.checkAvailability(productId, date);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check availability');
    }
  }
);

export const createBakeryOrder = createAsyncThunk(
  'bakery/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await bakeryService.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const fetchBakeryOrders = createAsyncThunk(
  'bakery/fetchOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await bakeryService.getOrders(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchBakeryOrderById = createAsyncThunk(
  'bakery/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await bakeryService.getOrderById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
  }
);

export const cancelBakeryOrder = createAsyncThunk(
  'bakery/cancelOrder',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await bakeryService.cancelOrder(id, reason);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel order');
    }
  }
);

const bakerySlice = createSlice({
  name: 'bakery',
  initialState: {
    products: [],
    categories: [],
    selectedProduct: null,
    orders: [],
    selectedOrder: null,
    currentCustomization: {
      productId: null,
      options: {},
      price: 0,
    },
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0,
    },
    filters: {
      category: '',
      isCustomizable: null,
      popularItem: null,
      seasonal: null,
      minPrice: '',
      maxPrice: '',
      sort: 'displayOrder',
    },
    loading: false,
    categoriesLoading: false,
    orderLoading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        category: '',
        isCustomizable: null,
        popularItem: null,
        seasonal: null,
        minPrice: '',
        maxPrice: '',
        sort: 'displayOrder',
      };
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    updateCustomization: (state, action) => {
      state.currentCustomization = {
        ...state.currentCustomization,
        ...action.payload,
      };
    },
    resetCustomization: (state) => {
      state.currentCustomization = {
        productId: null,
        options: {},
        price: 0,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBakeryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBakeryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        // Handle both nested pagination object and flat structure
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        } else {
          state.pagination = {
            page: action.payload.page || 1,
            limit: state.pagination.limit || 20,
            total: action.payload.total || 0,
            pages: action.payload.pages || 1
          };
        }
      })
      .addCase(fetchBakeryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBakeryProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBakeryProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchBakeryProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBakeryCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchBakeryCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        // Handle both direct categories array and nested response
        state.categories = action.payload.categories || action.payload || [];
      })
      .addCase(fetchBakeryCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })
      .addCase(calculateProductPrice.fulfilled, (state, action) => {
        state.currentCustomization.price = action.payload.price;
      })
      .addCase(createBakeryOrder.pending, (state) => {
        state.orderLoading = true;
        state.error = null;
      })
      .addCase(createBakeryOrder.fulfilled, (state) => {
        state.orderLoading = false;
        state.currentCustomization = {
          productId: null,
          options: {},
          price: 0,
        };
      })
      .addCase(createBakeryOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchBakeryOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBakeryOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBakeryOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBakeryOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBakeryOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchBakeryOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  setPage,
  updateCustomization,
  resetCustomization,
  clearError,
  clearSelectedProduct,
  clearSelectedOrder,
} = bakerySlice.actions;

export default bakerySlice.reducer;