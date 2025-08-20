import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Alert,
  TextField,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Store, AccountBalance } from '@mui/icons-material';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const PaymentForm = ({ orderData, onSubmit, onBack, loading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [depositAmount, setDepositAmount] = useState('');
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Calculate order total
  const calculateTotal = () => {
    const subtotal = orderData.items.reduce((total, item) => {
      return total + (item.totalPrice || item.unitPrice * item.quantity);
    }, 0);
    const tax = subtotal * 0.101;
    const deliveryFee = orderData.orderType === 'delivery' ? 15 : 0;
    return subtotal + tax + deliveryFee;
  };

  const total = calculateTotal();
  const minimumDeposit = total * 0.5; // 50% minimum deposit

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setCardError(null);
  };

  const handleSubmit = async () => {
    if (loading || processing) return;

    if (paymentMethod === 'online') {
      if (!stripe || !elements) {
        setCardError('Payment system not ready. Please wait a moment and try again.');
        return;
      }

      setProcessing(true);
      setCardError(null);

      try {
        const cardElement = elements.getElement(CardElement);
        
        // Create payment method
        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: `${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}`,
            email: orderData.customerInfo.email,
            phone: orderData.customerInfo.phone,
          },
        });

        if (error) {
          setCardError(error.message);
          setProcessing(false);
          return;
        }

        // Submit order with payment method
        await onSubmit({
          method: 'online',
          status: 'pending',
          paymentMethodId: stripePaymentMethod.id,
          totalAmount: total
        });

      } catch (error) {
        setCardError('Payment processing failed. Please try again.');
        setProcessing(false);
      }
    } else if (paymentMethod === 'deposit') {
      // Validate deposit amount
      const deposit = parseFloat(depositAmount);
      if (isNaN(deposit) || deposit < minimumDeposit) {
        setCardError(`Minimum deposit amount is $${minimumDeposit.toFixed(2)}`);
        return;
      }

      await onSubmit({
        method: 'deposit',
        status: 'pending',
        depositAmount: deposit,
        totalAmount: total
      });
    } else {
      // In-store payment
      await onSubmit({
        method: 'in-store',
        status: 'pending',
        totalAmount: total
      });
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Payment Information
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Order Total: ${total.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {orderData.orderType === 'pickup' ? 'Pickup' : 'Delivery'} on{' '}
            {new Date(orderData.pickupDate).toLocaleDateString()} at {orderData.pickupTime}
          </Typography>
        </Box>

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <FormControlLabel
                value="online"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCard />
                    <Box>
                      <Typography variant="subtitle1">Pay Online Now</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Secure payment with credit/debit card
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              {paymentMethod === 'online' && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </Box>
                  {cardError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {cardError}
                    </Alert>
                  )}
                </Box>
              )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <FormControlLabel
                value="deposit"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalance />
                    <Box>
                      <Typography variant="subtitle1">Pay Deposit Now</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay 50% now, remainder at pickup
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              {paymentMethod === 'deposit' && (
                <Box sx={{ mt: 2, ml: 4 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Deposit Amount"
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        InputProps={{
                          startAdornment: '$',
                        }}
                        helperText={`Minimum: $${minimumDeposit.toFixed(2)}`}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Chip 
                        label={`Remaining: $${(total - parseFloat(depositAmount || 0)).toFixed(2)}`}
                        color="primary"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  {paymentMethod === 'deposit' && depositAmount && (
                    <Box sx={{ mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </Box>
                  )}
                </Box>
              )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControlLabel
                value="in-store"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Store />
                    <Box>
                      <Typography variant="subtitle1">Pay at Pickup</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pay when you pick up your order
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </Paper>
          </RadioGroup>
        </FormControl>

        {paymentMethod === 'in-store' && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Your order will be confirmed once we verify availability. Payment will be collected when you pick up your order.
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 2, mb: 3, bgcolor: 'warning.light' }}>
        <Typography variant="body2" color="warning.dark">
          <strong>Cancellation Policy:</strong> Orders can be cancelled up to 24 hours before pickup for a full refund. 
          Cancellations between 24-48 hours receive a 50% refund. No refunds for cancellations less than 24 hours before pickup.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} size="large">
          Back
        </Button>
        <Button 
          variant="contained" 
          size="large"
          onClick={handleSubmit}
          disabled={loading || processing || (paymentMethod === 'online' && (!stripe || !elements))}
          sx={{
            background: 'linear-gradient(135deg, #D4724F 0%, #E6A38E 100%)',
            color: 'white',
            fontWeight: 600,
            px: 4,
            '&:hover': {
              background: 'linear-gradient(135deg, #E6A38E 0%, #D4724F 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(212, 114, 79, 0.3)',
            },
            '&.Mui-disabled': {
              background: 'rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.26)',
            }
          }}
        >
          {processing ? 'Processing...' : 'Place Order'}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;