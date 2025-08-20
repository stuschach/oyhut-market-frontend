import api from './api';
import { apiCallWithFallback, loadStaticData } from '../utils/apiWrapper';

const productService = {
  async getProducts(params = {}) {
    return apiCallWithFallback(
      async () => {
        const response = await api.get('/products', { params });
        return response.data;
      },
      async () => {
        // Fallback to static data
        const staticData = await loadStaticData('products.json');
        if (staticData.success) {
          // Apply basic filtering if params exist
          let products = staticData.data.products || [];
          
          if (params.category) {
            products = products.filter(p => p.category === params.category);
          }
          if (params.search) {
            const search = params.search.toLowerCase();
            products = products.filter(p => 
              p.name.toLowerCase().includes(search) ||
              p.description.toLowerCase().includes(search)
            );
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
        const response = await api.get(`/products/${id}`);
        return response.data;
      },
      async () => {
        // Fallback to finding product in static data
        const staticData = await loadStaticData('products.json');
        if (staticData.success) {
          const product = staticData.data.products.find(p => p._id === id);
          return product || null;
        }
        return null;
      }
    );
  },

  async getFeaturedProducts() {
    return apiCallWithFallback(
      async () => {
        const response = await api.get('/products/featured');
        return response.data;
      },
      async () => {
        // Fallback to static featured products
        const staticData = await loadStaticData('products.json');
        if (staticData.success) {
          const featured = staticData.data.products.filter(p => p.featured);
          return { products: featured };
        }
        return { products: [] };
      }
    );
  },

  async searchProducts(query) {
    return apiCallWithFallback(
      async () => {
        const response = await api.get('/products/search', { params: { q: query } });
        return response.data;
      },
      async () => {
        // Fallback to client-side search
        const staticData = await loadStaticData('products.json');
        if (staticData.success) {
          const search = query.toLowerCase();
          const results = staticData.data.products.filter(p => 
            p.name.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search)
          );
          return { products: results };
        }
        return { products: [] };
      }
    );
  },

  async addReview(productId, { rating, comment }) {
    // Reviews require backend - show message when offline
    return apiCallWithFallback(
      async () => {
        const response = await api.post(`/products/${productId}/reviews`, {
          rating,
          comment,
        });
        return response.data;
      },
      async () => {
        // Can't add reviews offline
        return { 
          success: false, 
          message: 'Reviews can only be added when online. Please try again later.',
          offline: true 
        };
      }
    );
  },
};

export default productService;