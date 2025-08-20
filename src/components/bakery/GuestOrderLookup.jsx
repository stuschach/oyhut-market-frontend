import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Alert
} from '@mui/material';
import { Search, Email, Receipt } from '@mui/icons-material';
import guestOrderService from '../../services/guestOrderService';

const GuestOrderLookup = ({ compact = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !orderNumber) {
      setError('Please enter both email and order number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await guestOrderService.trackOrder(email, orderNumber);
      
      // Navigate to tracking page with token
      navigate(`/track-order?token=${response.order.guestToken}`);
    } catch (err) {
      setError(err.message || 'Order not found. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Track Your Order
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            size="small"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            size="small"
            placeholder="Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={loading}
          >
            Track
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Track Your Guest Order
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email address and order number to track your bakery order
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          fullWidth
          label="Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          required
          placeholder="e.g., BAK-20240101-001"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Receipt />
              </InputAdornment>
            ),
          }}
        />
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Search />}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Track Order'}
        </Button>
      </Box>
    </Paper>
  );
};

export default GuestOrderLookup;