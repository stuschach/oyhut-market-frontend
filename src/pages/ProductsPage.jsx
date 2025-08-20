import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';

const ProductsPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.gradients.background, pb: 8 }}>
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
              Your Neighborhood Store
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
              We've got all the everyday essentials you need - snacks, drinks, beach gear, 
              groceries, and those last-minute items you forgot to pack.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                fontSize: '1.1rem',
              }}
            >
              🏪 Open Daily 8am-8pm
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {/* First paragraph with intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 4,
              }}
            >
              Welcome to The Market at Oyhut! We're your local convenience store, proudly serving the 
              beach community with a wide selection of everyday essentials. Our friendly staff is here to help 
              you find exactly what you need, whether you're stocking up for a beach day or grabbing a quick snack.
            </Typography>
          </motion.div>

          {/* First image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800"
              alt="Store shelves with snacks and drinks"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.shadows[4],
                mb: 4,
              }}
            />
          </motion.div>

          {/* Second paragraph about products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 4,
              }}
            >
              Our store features a comprehensive selection of beverages including cold beer, fine wines, and 
              refreshing soft drinks. You'll find all your grocery basics like milk, eggs, bread, and fresh produce. 
              We also carry beach essentials including sunscreen, toys, coolers, and ice. For your convenience, 
              we stock phone chargers, batteries, and other electronics accessories.
            </Typography>
          </motion.div>

          {/* Second image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800"
              alt="Convenience store interior"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.shadows[4],
                mb: 4,
              }}
            />
          </motion.div>

          {/* Third paragraph about service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 4,
              }}
            >
              What sets us apart is our commitment to customer service. We're happy to special order items that 
              you need, and our knowledgeable staff is always ready to help you locate products throughout the store. 
              We also offer lottery tickets and a full selection of tobacco and vape products for customers 21 and over.
            </Typography>
          </motion.div>

          {/* Third image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?w=800"
              alt="Cold beverage coolers"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: theme.shadows[4],
                mb: 4,
              }}
            />
          </motion.div>

          {/* Final paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.2rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 4,
              }}
            >
              We're open daily from 8am to 8pm for your convenience. Whether you need your morning coffee, 
              afternoon refreshments, or evening treats, we're here to serve you. Thank you for choosing 
              The Market at Oyhut as your neighborhood convenience store. We look forward to seeing you!
            </Typography>
          </motion.div>
        </Box>

      </Container>
    </Box>
  );
};

export default ProductsPage;