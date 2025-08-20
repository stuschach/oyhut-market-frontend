import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import {
  Search,
  CalendarToday,
  AccessTime,
  LocalShipping,
  Store,
  CheckCircle,
  Cancel,
  Phone,
  Email,
  Receipt
} from '@mui/icons-material';
import { format } from 'date-fns';
import guestOrderService from '../services/guestOrderService';

const orderStatusSteps = [
  'Order Placed',
  'Confirmed',
  'In Preparation',
  'Ready',
  'Completed'
];

const GuestOrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [lookupForm, setLookupForm] = useState({
    email: '',
    orderNumber: ''
  });
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);

  // Check for token in URL params
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      fetchOrderByToken(token);
    }
  }, [searchParams]);

  // Check for stored guest orders
  useEffect(() => {
    const storedOrders = guestOrderService.getStoredGuestOrders();
    if (storedOrders.length > 0 && !order) {
      // Pre-fill with the most recent order
      const recentOrder = storedOrders[storedOrders.length - 1];
      setLookupForm({
        email: recentOrder.email || '',
        orderNumber: recentOrder.orderNumber || ''
      });
    }
  }, [order]);

  const fetchOrderByToken = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const orderData = await guestOrderService.getOrderByToken(token);
      setOrder(orderData);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupForm.email || !lookupForm.orderNumber) {
      setError('Please enter both email and order number');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await guestOrderService.trackOrder(
        lookupForm.email,
        lookupForm.orderNumber
      );
      setOrder(response.order);
      
      // Update URL with token
      const newUrl = `${window.location.pathname}?token=${response.order.guestToken}`;
      window.history.pushState({}, '', newUrl);
    } catch (err) {
      setError(err.message || 'Order not found. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      return;
    }

    setCancelLoading(true);
    try {
      const response = await guestOrderService.cancelOrder(order.guestToken, cancelReason);
      
      // Update order status
      setOrder(prev => ({
        ...prev,
        status: 'cancelled',
        cancellationDate: response.order.cancellationDate,
        refundAmount: response.refundAmount
      }));
      
      setCancelDialogOpen(false);
      setCancelReason('');
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
    } finally {
      setCancelLoading(false);
    }
  };

  const getActiveStep = () => {
    switch (order?.status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'in-preparation':
        return 2;
      case 'ready':
        return 3;
      case 'completed':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'in-preparation':
        return 'info';
      case 'ready':
        return 'success';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const canCancelOrder = () => {
    if (!order || order.status === 'cancelled' || order.status === 'completed') {
      return false;
    }
    
    const pickupDate = new Date(order.pickupDate);
    const hoursUntilPickup = (pickupDate - new Date()) / (1000 * 60 * 60);
    return hoursUntilPickup > 24;
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading order details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Track Your Order
      </Typography>

      {!order ? (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Enter Your Order Details
          </Typography>
          
          <Box component="form" onSubmit={handleLookup}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={lookupForm.email}
                  onChange={(e) => setLookupForm({ ...lookupForm, email: e.target.value })}
                  required
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Order Number"
                  value={lookupForm.orderNumber}
                  onChange={(e) => setLookupForm({ ...lookupForm, orderNumber: e.target.value })}
                  required
                  placeholder="e.g., BAK-20240101-001"
                  InputProps={{
                    startAdornment: <Receipt sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Search />}
                  disabled={loading}
                >
                  Look Up Order
                </Button>
              </Grid>
            </Grid>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Recently viewed orders */}
          {guestOrderService.getStoredGuestOrders().length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Recently Viewed Orders
              </Typography>
              <List>
                {guestOrderService.getStoredGuestOrders().map((storedOrder, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => {
                      setLookupForm({
                        email: storedOrder.email,
                        orderNumber: storedOrder.orderNumber
                      });
                    }}
                  >
                    <ListItemText
                      primary={storedOrder.orderNumber}
                      secondary={`Viewed ${format(new Date(storedOrder.createdAt), 'MMM d, yyyy')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      ) : (
        <>
          {/* Order Found - Display Details */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Order {order.orderNumber}
                </Typography>
                <Chip 
                  label={order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                  color={getStatusColor(order.status)}
                  size="medium"
                />
              </Box>
              
              <Button
                variant="outlined"
                onClick={() => {
                  setOrder(null);
                  setLookupForm({ email: '', orderNumber: '' });
                  window.history.pushState({}, '', window.location.pathname);
                }}
              >
                Track Another Order
              </Button>
            </Box>

            {order.status !== 'cancelled' && (
              <Stepper activeStep={getActiveStep()} sx={{ mb: 4 }}>
                {orderStatusSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}

            {order.status === 'cancelled' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                This order was cancelled on {format(new Date(order.cancellationDate), 'MMMM d, yyyy')}.
                {order.refundAmount > 0 && ` Refund amount: $${order.refundAmount.toFixed(2)}`}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Information
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          {order.orderType === 'delivery' ? <LocalShipping /> : <Store />}
                        </ListItemIcon>
                        <ListItemText
                          primary={order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                          secondary={
                            order.orderType === 'delivery' && order.deliveryAddress
                              ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}`
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
                          secondary={format(new Date(order.pickupDate), 'EEEE, MMMM d, yyyy')}
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <AccessTime />
                        </ListItemIcon>
                        <ListItemText
                          primary="Time"
                          secondary={order.pickupTime}
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <Phone />
                        </ListItemIcon>
                        <ListItemText
                          primary="Contact"
                          secondary={`${order.customerInfo.firstName} ${order.customerInfo.lastName} - ${order.customerInfo.phone}`}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Timeline
                    </Typography>
                    
                    <List dense>
                      {order.timeline?.slice(-3).reverse().map((event, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('-', ' ')}
                            secondary={format(new Date(event.timestamp), 'MMM d, yyyy h:mm a')}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* Order Items */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            
            {order.items.map((item, index) => (
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
              <Typography>${order.subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Tax</Typography>
              <Typography>${order.tax.toFixed(2)}</Typography>
            </Box>
            
            {order.deliveryFee > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Delivery Fee</Typography>
                <Typography>${order.deliveryFee.toFixed(2)}</Typography>
              </Box>
            )}
            
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${order.total.toFixed(2)}</Typography>
            </Box>
          </Paper>

          {/* Actions */}
          {canCancelOrder() && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Actions
              </Typography>
              
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={() => setCancelDialogOpen(true)}
              >
                Cancel Order
              </Button>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Orders can be cancelled up to 24 hours before pickup
              </Typography>
            </Paper>
          )}

          {/* Cancel Dialog */}
          <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
            <DialogTitle>Cancel Order</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to cancel this order? This action cannot be undone.
              </DialogContentText>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Reason for cancellation"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                sx={{ mt: 2 }}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCancelDialogOpen(false)}>
                Keep Order
              </Button>
              <Button 
                onClick={handleCancelOrder} 
                color="error"
                disabled={!cancelReason.trim() || cancelLoading}
              >
                {cancelLoading ? 'Cancelling...' : 'Cancel Order'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default GuestOrderTrackingPage;