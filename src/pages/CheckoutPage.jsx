import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Button, Divider } from '@mui/material';
import { Phone, Email, LocationOn, AccessTime } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { checkBackendAvailability } from '../utils/apiWrapper';

const CheckoutPage = () => {
  const [backendAvailable, setBackendAvailable] = useState(null);
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    checkBackendAvailability().then(setBackendAvailable);
  }, []);

  // If backend is available in the future, original checkout flow would go here
  if (backendAvailable === true) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Checkout</Typography>
        <Typography>Online checkout coming soon...</Typography>
      </Container>
    );
  }

  // Static checkout - Call to Order
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Complete Your Order</Typography>
      
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          Call to Place Your Order
        </Typography>
        
        <Typography variant="body1" paragraph>
          Online ordering is coming soon! For now, please call us to place your order.
          Have your cart ready - our staff will help you complete your purchase.
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6" gutterBottom>Your Cart Summary:</Typography>
          <Typography variant="body2" color="text.secondary">
            {items.length} items - Total: ${total.toFixed(2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Phone color="primary" />
            <Typography variant="h6">(360) 555-1234</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime color="primary" />
            <Box>
              <Typography variant="body1">Store Hours:</Typography>
              <Typography variant="body2" color="text.secondary">
                Monday - Saturday: 7:00 AM - 9:00 PM<br />
                Sunday: 8:00 AM - 8:00 PM
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn color="primary" />
            <Box>
              <Typography variant="body1">Visit Us:</Typography>
              <Typography variant="body2" color="text.secondary">
                123 Coastal Highway<br />
                Ocean Park, WA 98640
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email color="primary" />
            <Typography variant="body1">
              Email: orders@oyhutmarket.com
            </Typography>
          </Box>
        </Box>

        <Button 
          variant="contained" 
          size="large" 
          sx={{ mt: 3 }}
          href="tel:3605551234"
        >
          Call Now to Order
        </Button>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <Typography variant="body2">
          <strong>Why Call?</strong> Our friendly staff can answer questions about products, 
          check availability, arrange special orders, and schedule pickup or delivery times 
          that work best for you.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;