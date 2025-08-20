import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid
} from '@mui/material';
import {
  CheckCircle,
  Email,
  Phone,
  CalendarToday,
  AccessTime,
  LocalShipping,
  Store,
  ContentCopy,
  Print,
  Home
} from '@mui/icons-material';
import { format } from 'date-fns';

const OrderConfirmation = ({ order, onClose }) => {
  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading order details...</Typography>
      </Box>
    );
  }

  const { order: orderData, trackingInfo } = order;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a snackbar notification here
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <CheckCircle color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Thank you for your order. We've sent a confirmation email to {trackingInfo.email}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Order Number:
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {orderData.orderNumber}
              </Typography>
              <Button
                size="small"
                startIcon={<ContentCopy />}
                onClick={() => copyToClipboard(orderData.orderNumber)}
              >
                Copy
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)} 
                color="primary" 
                size="small"
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem>
            <ListItemIcon>
              {orderData.orderType === 'delivery' ? <LocalShipping /> : <Store />}
            </ListItemIcon>
            <ListItemText
              primary={orderData.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
              secondary={
                orderData.orderType === 'delivery' && orderData.deliveryAddress
                  ? `${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.state} ${orderData.deliveryAddress.zipCode}`
                  : 'The Market at Oyhut'
              }
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText
              primary="Date"
              secondary={format(new Date(orderData.pickupDate), 'EEEE, MMMM d, yyyy')}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText
              primary="Time"
              secondary={orderData.pickupTime}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText
              primary="Contact"
              secondary={`${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName} - ${orderData.customerInfo.phone}`}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={trackingInfo.email}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        
        {orderData.items.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle1">
                {item.productName} x {item.quantity}
              </Typography>
              <Typography variant="subtitle1">
                ${item.totalPrice.toFixed(2)}
              </Typography>
            </Box>
            {(item.size || item.flavor || item.customText) && (
              <Typography variant="body2" color="text.secondary">
                {item.size && `Size: ${item.size}`}
                {item.size && item.flavor && ' • '}
                {item.flavor && `Flavor: ${item.flavor}`}
                {item.customText && ` • "${item.customText}"`}
              </Typography>
            )}
          </Box>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography>${orderData.subtotal.toFixed(2)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Tax</Typography>
          <Typography>${orderData.tax.toFixed(2)}</Typography>
        </Box>
        
        {orderData.deliveryFee > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Delivery Fee</Typography>
            <Typography>${orderData.deliveryFee.toFixed(2)}</Typography>
          </Box>
        )}
        
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${orderData.total.toFixed(2)}</Typography>
        </Box>
      </Paper>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Track Your Order
        </Typography>
        <Typography variant="body2">
          Since you checked out as a guest, use this link to track your order:
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => copyToClipboard(window.location.origin + trackingInfo.trackingUrl)}
          >
            Copy Tracking Link
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Or use your order number ({orderData.orderNumber}) and email address to look up your order.
        </Typography>
      </Alert>

      <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.100' }}>
        <Typography variant="h6" gutterBottom>
          What's Next?
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="1. We'll review your order and start preparation" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. You'll receive email updates as your order progresses" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. We'll notify you when your order is ready" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Bring your order number when picking up" />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={handlePrint}
        >
          Print Order
        </Button>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={onClose}
        >
          Return to Home
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;