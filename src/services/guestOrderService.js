import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class GuestOrderService {
  async createOrder(orderData) {
    try {
      const response = await axios.post(`${API_URL}/bakery/guest/orders`, orderData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrderByToken(guestToken) {
    try {
      const response = await axios.get(`${API_URL}/bakery/guest/orders/${guestToken}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async trackOrder(email, orderNumber) {
    try {
      const response = await axios.post(`${API_URL}/bakery/guest/orders/track`, {
        email,
        orderNumber
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async cancelOrder(guestToken, reason) {
    try {
      const response = await axios.post(`${API_URL}/bakery/guest/orders/${guestToken}/cancel`, {
        reason
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Store guest order info in localStorage for easy access
  saveGuestOrderInfo(orderInfo) {
    const guestOrders = this.getStoredGuestOrders();
    guestOrders.push({
      orderNumber: orderInfo.orderNumber,
      guestToken: orderInfo.guestToken,
      email: orderInfo.email,
      createdAt: new Date().toISOString()
    });
    
    // Keep only the last 10 orders
    const recentOrders = guestOrders.slice(-10);
    localStorage.setItem('guestOrders', JSON.stringify(recentOrders));
  }

  getStoredGuestOrders() {
    try {
      const orders = localStorage.getItem('guestOrders');
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('Error parsing stored guest orders:', error);
      return [];
    }
  }

  clearStoredGuestOrders() {
    localStorage.removeItem('guestOrders');
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data.message || 'An error occurred';
      const errors = error.response.data.errors || [];
      return { message, errors, status: error.response.status };
    } else if (error.request) {
      // No response from server
      return { message: 'Unable to connect to server. Please check your connection.', status: 0 };
    } else {
      // Other errors
      return { message: error.message || 'An unexpected error occurred', status: 0 };
    }
  }
}

export default new GuestOrderService();