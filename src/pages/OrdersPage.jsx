import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const OrdersPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your order history and track current orders.
        </Typography>
      </Box>
    </Container>
  );
};

export default OrdersPage;