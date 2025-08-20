import api from './api';

const categoryService = {
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  async getCategoryTree() {
    const response = await api.get('/categories/tree');
    return response.data;
  },

  async getCategoryBySlug(slug) {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },
};

export default categoryService;