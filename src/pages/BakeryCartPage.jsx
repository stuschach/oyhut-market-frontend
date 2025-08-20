import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  IconButton,
  Divider,
  Alert,
  Card,
  CardContent,
  Chip,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Schedule as ScheduleIcon,
  ShoppingCart as CartIcon,
  Cake as CakeIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import {
  updateBakeryItem,
  removeBakeryItem,
  clearBakeryCart,
  selectBakeryCartTotal,
} from '../store/slices/bakeryCartSlice';
import { formatCurrency } from '../utils/helpers';

const BakeryCartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.bakeryCart);
  const cartTotal = useSelector(selectBakeryCartTotal);

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateBakeryItem({ id: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeBakeryItem(itemId));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your bakery cart?')) {
      dispatch(clearBakeryCart());
    }
  };

  const handleCheckout = () => {
    navigate('/bakery/checkout', { 
      state: { 
        cartItems: items.map(item => ({
          ...item,
          productName: item.productName,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        }))
      } 
    });
  };

  const taxRate = 0.101; // 10.1% WA state tax
  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <CakeIcon sx={{ fontSize: 100, color: 'text.disabled', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              Your bakery cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Browse our delicious baked goods and add items to your cart
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/bakery')}
              size="large"
              sx={{
                background: theme.palette.gradients.primary,
                '&:hover': {
                  background: theme.palette.gradients.secondary,
                },
              }}
            >
              Shop Bakery
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/bakery')}
        sx={{ mb: 3 }}
      >
        Continue Shopping
      </Button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" gutterBottom sx={{ 
          fontWeight: 700,
          fontFamily: '"Playfair Display", serif',
        }}>
          Bakery Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Cart Items
              </Typography>
              <Button
                color="error"
                onClick={handleClearCart}
                size="small"
                variant="outlined"
              >
                Clear Cart
              </Button>
            </Box>
            
            <Divider sx={{ mb: 3 }} />

            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3} md={2}>
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.productName}
                            sx={{
                              width: '100%',
                              height: { xs: 150, sm: 100 },
                              objectFit: 'cover',
                              borderRadius: 2,
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={9} md={5}>
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            {item.productName}
                          </Typography>
                          
                          <Box sx={{ mb: 1 }}>
                            {item.size && (
                              <Chip 
                                label={`Size: ${item.size.name}`} 
                                size="small" 
                                sx={{ mr: 1, mb: 0.5 }} 
                              />
                            )}
                            {item.flavor && (
                              <Chip 
                                label={`Flavor: ${item.flavor}`} 
                                size="small" 
                                sx={{ mr: 1, mb: 0.5 }} 
                              />
                            )}
                          </Box>

                          {item.customizations && item.customizations.length > 0 && (
                            <Box sx={{ mb: 1 }}>
                              {item.customizations.map((custom, idx) => (
                                <Typography key={idx} variant="caption" color="text.secondary" display="block">
                                  {custom.name}: {custom.value}
                                </Typography>
                              ))}
                            </Box>
                          )}

                          {item.specialInstructions && (
                            <Typography variant="body2" color="text.secondary">
                              Special Instructions: {item.specialInstructions}
                            </Typography>
                          )}

                          {item.requiresAdvanceOrder && item.pickupDate && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                              <ScheduleIcon fontSize="small" sx={{ color: 'warning.main' }} />
                              <Typography variant="caption" color="warning.main">
                                Pickup: {new Date(item.pickupDate).toLocaleDateString()} 
                                {item.pickupTime && ` at ${item.pickupTime}`}
                              </Typography>
                            </Box>
                          )}
                        </Grid>

                        <Grid item xs={6} sm={4} md={2}>
                          <Typography variant="body2" color="text.secondary">
                            Unit Price
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {formatCurrency(item.unitPrice)}
                          </Typography>
                        </Grid>

                        <Grid item xs={6} sm={8} md={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                sx={{ border: `1px solid ${theme.palette.divider}` }}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography sx={{ mx: 2, minWidth: 30, textAlign: 'center', fontWeight: 600 }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                sx={{ border: `1px solid ${theme.palette.divider}` }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>
                            
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                          
                          <Typography variant="h6" sx={{ mt: 1, textAlign: 'right', color: 'primary.main', fontWeight: 700 }}>
                            {formatCurrency(item.totalPrice)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Paper sx={{ p: 3, position: 'sticky', top: 80 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Order Summary
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                {items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ pr: 2 }}>
                      {item.productName} x {item.quantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatCurrency(item.totalPrice)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">
                    {formatCurrency(subtotal)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Tax (10.1%)</Typography>
                  <Typography variant="body1">
                    {formatCurrency(tax)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {formatCurrency(total)}
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Guest checkout available!
                </Typography>
                <Typography variant="caption">
                  No account required - order as a guest
                </Typography>
              </Alert>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                startIcon={<CartIcon />}
                sx={{
                  background: theme.palette.gradients.primary,
                  fontWeight: 600,
                  py: 1.5,
                  '&:hover': {
                    background: theme.palette.gradients.secondary,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="text"
                fullWidth
                onClick={() => navigate('/bakery')}
                sx={{ mt: 1 }}
              >
                Continue Shopping
              </Button>

              {/* Order Notes */}
              <Box sx={{ mt: 3, p: 2, background: theme.palette.action.hover, borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  <strong>Important:</strong> All bakery items are made fresh to order. 
                  All orders must be picked up at the specified time.
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BakeryCartPage;