import api from './api';
import { apiCallWithFallback, loadStaticData } from '../utils/apiWrapper';

const bakeryService = {
  async getProducts(params = {}) {
    return apiCallWithFallback(
      async () => {
        const response = await api.get('/bakery/products', { params });
        return response.data;
      },
      async () => {
        // Fallback to static bakery data
        const staticData = await loadStaticData('bakery-products.json');
        if (staticData.success) {
          let products = staticData.data.products || [];
          
          // Apply basic filtering if params exist
          if (params.category) {
            products = products.filter(p => p.category === params.category);
          }
          
          return {
            products,
            total: products.length,
            page: 1,
            pages: 1
          };
        }
        return { products: [], total: 0 };
      }
    );
  },

  async getProductById(id) {
    return apiCallWithFallback(
      async () => {
        const response = await api.get(`/bakery/products/${id}`);
        return response.data;
      },
      async () => {
        // Fallback to finding product in static data
        const staticData = await loadStaticData('bakery-products.json');
        if (staticData.success) {
          const product = staticData.data.products.find(p => p._id === id);
          return product || null;
        }
        return null;
      }
    );
  },

  async getCategories() {
    return apiCallWithFallback(
      async () => {
        const response = await api.get('/bakery/products/categories');
        return response.data;
      },
      async () => {
        // Load categories from static data and count products per category
        const staticData = await loadStaticData('bakery-products.json');
        if (staticData.success) {
          const products = staticData.data.products || [];
          
          // Count products per category
          const categoryCounts = {};
          products.forEach(product => {
            if (product.category) {
              categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
            }
          });
          
          // Build categories array from the actual data
          const categories = Object.entries(categoryCounts).map(([id, count]) => ({
            _id: id,
            name: id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' '),
            count: count
          }));
          
          return { categories };
        }
        return { categories: [] };
      }
    );
  },

  async calculatePrice(productId, customizations) {
    const response = await api.post(`/bakery/products/${productId}/calculate-price`, {
      customizations,
    });
    return response.data;
  },

  async checkAvailability(productId, date) {
    // Check if user is authenticated by looking for token
    const token = localStorage.getItem('token');
    const endpoint = token 
      ? `/bakery/products/${productId}/check-availability`
      : `/bakery/guest/products/${productId}/check-availability`;
    
    const response = await api.post(endpoint, {
      date,
    });
    return response.data;
  },

  async createOrder(orderData) {
    const response = await api.post('/bakery/orders', orderData);
    return response.data;
  },

  async getOrders(params = {}) {
    const response = await api.get('/bakery/orders', { params });
    return response.data;
  },

  async getOrderById(id) {
    const response = await api.get(`/bakery/orders/${id}`);
    return response.data;
  },

  async cancelOrder(id, reason) {
    const response = await api.post(`/bakery/orders/${id}/cancel`, { reason });
    return response.data;
  },

  async uploadOrderImage(orderId, file, description) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description || '');

    const response = await api.post(`/bakery/orders/${orderId}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default bakeryService;