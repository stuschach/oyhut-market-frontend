import React from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Box, useTheme } from '@mui/material';

const CartPage = () => {
  const theme = useTheme();
  
  return (
    <Container sx={{ pt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontFamily: '"Playfair Display", serif',
              background: theme.palette.gradients.text,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Shopping Cart
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: 800,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Review your selected items and proceed to checkout when ready.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: 2,
              fontSize: '1.1rem',
            }}
          >
            🛒 Free delivery on orders over $50
          </Typography>
        </Box>
      </motion.div>
      
      <Typography>Cart page functionality coming soon...</Typography>
    </Container>
  );
};

export default CartPage;