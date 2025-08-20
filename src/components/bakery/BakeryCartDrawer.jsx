import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  Divider,
  Chip,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Cake as CakeIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { 
  closeBakeryCart, 
  updateBakeryItem, 
  removeBakeryItem,
  selectBakeryCartTotal 
} from '../../store/slices/bakeryCartSlice';
import { formatCurrency } from '../../utils/helpers';

const BakeryCartDrawer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector((state) => state.bakeryCart);
  const cartTotal = useSelector(selectBakeryCartTotal);

  const handleClose = () => {
    dispatch(closeBakeryCart());
  };

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateBakeryItem({ id: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeBakeryItem(itemId));
  };

  const handleCheckout = () => {
    handleClose();
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

  const handleViewCart = () => {
    handleClose();
    navigate('/bakery/cart');
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: 450 }, 
          maxWidth: '100%',
          background: theme.palette.background.default,
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: theme.palette.gradients.warm,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CakeIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Bakery Cart
            </Typography>
            {items.length > 0 && (
              <Chip
                label={`${items.length} items`}
                size="small"
                color="primary"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>

        {items.length === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CakeIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            </motion.div>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your bakery cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Browse our fresh baked goods and custom cakes
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                navigate('/bakery');
              }}
              sx={{
                background: theme.palette.gradients.primary,
                '&:hover': {
                  background: theme.palette.gradients.secondary,
                },
              }}
            >
              Shop Bakery
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem sx={{ py: 2, flexDirection: 'column', alignItems: 'stretch' }}>
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.productName}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 2,
                          border: `2px solid ${theme.palette.divider}`,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.productName}
                        </Typography>
                        
                        {/* Display customizations */}
                        <Box sx={{ mb: 1 }}>
                          {item.size && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              Size: {item.size.name}
                            </Typography>
                          )}
                          {item.flavor && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              Flavor: {item.flavor}
                            </Typography>
                          )}
                          {item.specialInstructions && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              Note: {item.specialInstructions}
                            </Typography>
                          )}
                        </Box>

                        <Typography variant="body2" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
                          {formatCurrency(item.unitPrice)} each
                        </Typography>

                        {item.requiresAdvanceOrder && item.pickupDate && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                            <ScheduleIcon fontSize="small" sx={{ color: 'warning.main' }} />
                            <Typography variant="caption" color="warning.main">
                              Pickup: {new Date(item.pickupDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              '&:hover': {
                                background: theme.palette.action.hover,
                              },
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center', fontWeight: 600 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              '&:hover': {
                                background: theme.palette.action.hover,
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <Box sx={{ flexGrow: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {formatCurrency(item.totalPrice)}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                  {index < items.length - 1 && <Divider />}
                </motion.div>
              ))}
            </List>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', background: theme.palette.background.paper }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Guest checkout available - no account required!
              </Alert>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {formatCurrency(cartTotal)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  size="large"
                  sx={{
                    background: theme.palette.gradients.primary,
                    fontWeight: 600,
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
                  variant="outlined"
                  fullWidth
                  onClick={handleViewCart}
                >
                  View Full Cart
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default BakeryCartDrawer;