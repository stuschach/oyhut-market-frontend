import api from './api';

const orderService = {
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getOrders(params = {}) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async getOrderById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async trackOrder(orderNumber) {
    const response = await api.get(`/orders/track/${orderNumber}`);
    return response.data;
  },

  async updateOrderStatus(id, status, notes) {
    const response = await api.patch(`/orders/${id}/status`, { status, notes });
    return response.data;
  },
};

export default orderService;