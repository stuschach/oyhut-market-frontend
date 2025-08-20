import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProductDetailPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View product information, pricing, and availability.
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;