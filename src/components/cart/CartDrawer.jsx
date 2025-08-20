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
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Badge,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as CartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { 
  closeCart, 
  updateCartItem, 
  removeFromCart,
  selectCartTotal 
} from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/helpers';

const CartDrawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector((state) => state.cart);
  const cartTotal = useSelector(selectCartTotal);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    handleClose();
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  const handleViewCart = () => {
    handleClose();
    navigate('/cart');
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, maxWidth: '100%' }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CartIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Shopping Cart
            </Typography>
            {items.length > 0 && (
              <Chip
                label={`${items.length} items`}
                size="small"
                color="primary"
              />
            )}
          </Box>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {items.length === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
            <CartIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Start shopping to add items to your cart
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                navigate('/products');
              }}
            >
              Shop Now
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
              {items.map((item) => (
                <ListItem key={item.product._id} sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                    {item.product.images?.[0] && (
                      <Box
                        component="img"
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                        {formatCurrency(item.product.price)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity, -1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveItem(item.product._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                  {formatCurrency(cartTotal)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  size="large"
                >
                  Checkout
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleViewCart}
                >
                  View Cart
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;