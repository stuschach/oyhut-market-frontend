import React from 'react';
import { Container, Typography } from '@mui/material';

const BakeryOrdersPage = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">My Bakery Orders</Typography>
      <Typography>Your bakery order history will appear here...</Typography>
    </Container>
  );
};

export default BakeryOrdersPage;