import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import GuestCheckoutForm from '../components/bakery/GuestCheckoutForm';
import OrderReview from '../components/bakery/OrderReview';
import PaymentForm from '../components/bakery/PaymentForm';
import OrderConfirmation from '../components/bakery/OrderConfirmation';
import guestOrderService from '../services/guestOrderService';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const steps = ['Review Order', 'Customer Information', 'Payment', 'Confirmation'];

const BakeryCheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({
    items: [],
    orderType: 'pickup',
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      alternatePhone: ''
    },
    pickupDate: '',
    pickupTime: '',
    deliveryAddress: {
      street: '',
      city: '',
      state: 'WA',
      zipCode: '',
      instructions: ''
    },
    paymentInfo: {
      method: 'online'
    },
    specialInstructions: '',
    occasion: 'none',
    occasionDetails: '',
    recipientName: '',
    themeColors: []
  });
  const [completedOrder, setCompletedOrder] = useState(null);

  // Get order data from location state or redirect if empty
  useEffect(() => {
    console.log('BakeryCheckoutPage - location.state:', location.state);
    if (location.state?.orderData) {
      const { product, quantity, size, flavor, customizations, specialInstructions, pickupDate, pickupTime, totalPrice } = location.state.orderData;
      
      // Convert single product order to cart items format
      const cartItem = {
        id: product._id,
        productName: product.name,  // Changed from 'name' to 'productName'
        quantity,
        size,
        flavor,
        customizations,
        specialInstructions,
        unitPrice: totalPrice / quantity,  // Changed from 'price' to 'unitPrice'
        totalPrice,
        image: product.images?.[0]?.url || 'https://via.placeholder.com/100'
      };
      
      setOrderData(prev => ({
        ...prev,
        items: [cartItem],
        pickupDate: pickupDate ? new Date(pickupDate).toISOString().split('T')[0] : '',
        pickupTime: pickupTime ? new Date(pickupTime).toTimeString().slice(0, 5) : '',
        specialInstructions
      }));
    } else if (location.state?.cartItems) {
      // Support for cart-based checkout (future feature)
      setOrderData(prev => ({
        ...prev,
        items: location.state.cartItems
      }));
    } else {
      // No order data found, redirect back
      navigate('/bakery');
    }
  }, [location.state, navigate]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setOrderData(prev => ({
        ...prev,
        customerInfo: {
          ...prev.customerInfo,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || ''
        }
      }));
    }
  }, [user]);

  const handleNext = () => {
    console.log('handleNext called, current step:', activeStep);
    if (activeStep === steps.length - 1) {
      navigate('/');
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const updateOrderData = (data) => {
    setOrderData(prev => ({ ...prev, ...data }));
  };

  const handleSubmitOrder = async (paymentData) => {
    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        ...orderData,
        paymentInfo: {
          ...orderData.paymentInfo,
          ...paymentData
        }
      };

      // Create guest order
      const response = await guestOrderService.createOrder(orderPayload);
      
      // Save order info for tracking
      guestOrderService.saveGuestOrderInfo(response.trackingInfo);
      
      setCompletedOrder(response);
      setActiveStep(steps.length - 1);
    } catch (err) {
      console.error('Order submission error:', err);
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = () => {
    console.log('Current step:', activeStep, 'OrderData:', orderData);
    switch (activeStep) {
      case 0:
        return (
          <OrderReview 
            orderData={orderData}
            onUpdate={updateOrderData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <GuestCheckoutForm
            orderData={orderData}
            onUpdate={updateOrderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <Elements stripe={stripePromise}>
            <PaymentForm
              orderData={orderData}
              onSubmit={handleSubmitOrder}
              onBack={handleBack}
              loading={loading}
            />
          </Elements>
        );
      case 3:
        return (
          <OrderConfirmation
            order={completedOrder}
            onClose={() => navigate('/')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/bakery/cart')}
        sx={{ mb: 2 }}
      >
        Back to Cart
      </Button>

      <Typography variant="h4" gutterBottom>
        Bakery Checkout
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          getStepContent()
        )}
      </Paper>
    </Container>
  );
};

export default BakeryCheckoutPage;