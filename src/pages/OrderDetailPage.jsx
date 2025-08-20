import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const OrderDetailPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View the details of your order including items, shipping, and status.
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderDetailPage;