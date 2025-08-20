import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  Chip,
  Grid
} from '@mui/material';
import { ShoppingCart, LocalShipping, Store } from '@mui/icons-material';

const OrderReview = ({ orderData, onUpdate, onNext }) => {
  const calculateSubtotal = () => {
    return orderData.items.reduce((total, item) => {
      return total + (item.totalPrice || item.unitPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.101; // 10.1% WA state tax
  const tax = subtotal * taxRate;
  const deliveryFee = orderData.orderType === 'delivery' ? 15 : 0;
  const total = subtotal + tax + deliveryFee;

  const formatCustomizations = (customizations) => {
    if (!customizations || customizations.length === 0) return null;
    
    return customizations.map((custom, index) => (
      <Box key={index} sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
        {custom.name || custom.optionName}: {custom.value}
        {custom.priceModifier > 0 && ` (+$${custom.priceModifier})`}
      </Box>
    ));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShoppingCart /> Order Summary
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1">{item.productName}</Typography>
                    {item.size && (
                      <Chip label={typeof item.size === 'object' ? item.size.name : item.size} size="small" sx={{ mr: 1, mt: 0.5 }} />
                    )}
                    {item.flavor && (
                      <Chip label={item.flavor} size="small" sx={{ mr: 1, mt: 0.5 }} />
                    )}
                    {formatCustomizations(item.customizations)}
                    {item.customText && (
                      <Typography variant="body2" color="text.secondary">
                        Custom Text: "{item.customText}"
                      </Typography>
                    )}
                    {item.specialInstructions && (
                      <Typography variant="body2" color="text.secondary">
                        Note: {item.specialInstructions}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">
                  ${(item.unitPrice || item.totalPrice / item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  ${(item.totalPrice || item.unitPrice * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Order Type
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {orderData.orderType === 'delivery' ? (
                <>
                  <LocalShipping color="primary" />
                  <Typography>Delivery</Typography>
                </>
              ) : (
                <>
                  <Store color="primary" />
                  <Typography>Pickup</Typography>
                </>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Tax (10.1%):</span>
                <span>${tax.toFixed(2)}</span>
              </Typography>
              {deliveryFee > 0 && (
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </Typography>
              )}
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 1, mb: 3 }}>
        <Typography variant="body2" color="info.dark">
          <strong>Important:</strong> All bakery orders are made fresh to order. 
          Custom cakes and large orders may require additional time.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          size="large"
          onClick={onNext}
          sx={{
            background: 'linear-gradient(135deg, #D4724F 0%, #E6A38E 100%)',
            color: 'white',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            '&:hover': {
              background: 'linear-gradient(135deg, #E6A38E 0%, #D4724F 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(212, 114, 79, 0.3)',
            },
          }}
        >
          Continue to Customer Information
        </Button>
      </Box>
    </Box>
  );
};

export default OrderReview;