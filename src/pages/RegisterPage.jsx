import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create your account to start shopping at Oyhut Market.
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;