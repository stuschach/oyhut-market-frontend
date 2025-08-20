import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Alert,
  InputAdornment,
  MenuItem,
  Select,
  Chip,
  FormHelperText
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, setHours, setMinutes, format, isWeekend } from 'date-fns';
import { Phone, Email, Home, Schedule } from '@mui/icons-material';

const occasions = [
  { value: 'none', label: 'No Special Occasion' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'baby-shower', label: 'Baby Shower' },
  { value: 'other', label: 'Other' }
];

const themeColorOptions = [
  'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 
  'Orange', 'Black', 'White', 'Gold', 'Silver', 'Rose Gold'
];

const GuestCheckoutForm = ({ orderData, onUpdate, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(orderData.orderType === 'delivery');

  // Minimum pickup date is today
  const minDate = new Date();
  
  // Store hours: 9 AM to 6 PM
  const minTime = setHours(setMinutes(new Date(), 0), 9);
  const maxTime = setHours(setMinutes(new Date(), 0), 18);

  const validateForm = () => {
    const newErrors = {};

    // Customer info validation
    if (!orderData.customerInfo.firstName.trim()) {
      newErrors['customerInfo.firstName'] = 'First name is required';
    }
    if (!orderData.customerInfo.lastName.trim()) {
      newErrors['customerInfo.lastName'] = 'Last name is required';
    }
    if (!orderData.customerInfo.email.trim()) {
      newErrors['customerInfo.email'] = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customerInfo.email)) {
      newErrors['customerInfo.email'] = 'Invalid email format';
    }
    if (!orderData.customerInfo.phone.trim()) {
      newErrors['customerInfo.phone'] = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(orderData.customerInfo.phone)) {
      newErrors['customerInfo.phone'] = 'Invalid phone format';
    }

    // Pickup/delivery validation
    if (!orderData.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    }
    if (!orderData.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required';
    }

    // Delivery address validation
    if (orderData.orderType === 'delivery') {
      if (!orderData.deliveryAddress.street.trim()) {
        newErrors['deliveryAddress.street'] = 'Street address is required';
      }
      if (!orderData.deliveryAddress.city.trim()) {
        newErrors['deliveryAddress.city'] = 'City is required';
      }
      if (!orderData.deliveryAddress.zipCode.trim()) {
        newErrors['deliveryAddress.zipCode'] = 'ZIP code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(orderData.deliveryAddress.zipCode)) {
        newErrors['deliveryAddress.zipCode'] = 'Invalid ZIP code format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleFieldChange = (field, value) => {
    const keys = field.split('.');
    if (keys.length === 2) {
      onUpdate({
        [keys[0]]: {
          ...orderData[keys[0]],
          [keys[1]]: value
        }
      });
    } else {
      onUpdate({ [field]: value });
    }
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleOrderTypeChange = (event) => {
    const newOrderType = event.target.value;
    handleFieldChange('orderType', newOrderType);
    setShowDeliveryAddress(newOrderType === 'delivery');
  };

  const shouldDisableDate = (date) => {
    // Disable past dates and optionally weekends
    return date < minDate;
  };

  const shouldDisableTime = (value, clockType) => {
    const hours = value.getHours();
    return hours < 9 || hours >= 18;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Customer Information
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Customer Info Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={orderData.customerInfo.firstName}
              onChange={(e) => handleFieldChange('customerInfo.firstName', e.target.value)}
              error={!!errors['customerInfo.firstName']}
              helperText={errors['customerInfo.firstName']}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={orderData.customerInfo.lastName}
              onChange={(e) => handleFieldChange('customerInfo.lastName', e.target.value)}
              error={!!errors['customerInfo.lastName']}
              helperText={errors['customerInfo.lastName']}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={orderData.customerInfo.email}
              onChange={(e) => handleFieldChange('customerInfo.email', e.target.value)}
              error={!!errors['customerInfo.email']}
              helperText={errors['customerInfo.email'] || 'We\'ll send order confirmations here'}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={orderData.customerInfo.phone}
              onChange={(e) => handleFieldChange('customerInfo.phone', e.target.value)}
              error={!!errors['customerInfo.phone']}
              helperText={errors['customerInfo.phone'] || 'We\'ll contact you here if needed'}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alternate Phone (Optional)"
              value={orderData.customerInfo.alternatePhone}
              onChange={(e) => handleFieldChange('customerInfo.alternatePhone', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Order Type and Timing */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Order Type</FormLabel>
              <RadioGroup
                row
                value={orderData.orderType}
                onChange={handleOrderTypeChange}
              >
                <FormControlLabel 
                  value="pickup" 
                  control={<Radio />} 
                  label="Pickup"
                />
                <FormControlLabel 
                  value="delivery" 
                  control={<Radio />} 
                  label="Delivery (+$15)"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Pickup Date"
                value={orderData.pickupDate ? new Date(orderData.pickupDate) : null}
                onChange={(newValue) => handleFieldChange('pickupDate', newValue)}
                minDate={minDate}
                shouldDisableDate={shouldDisableDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.pickupDate,
                    helperText: errors.pickupDate || 'Select your pickup date',
                    required: true
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Pickup Time"
                value={orderData.pickupTime ? 
                  setHours(setMinutes(new Date(), parseInt(orderData.pickupTime.split(':')[1])), parseInt(orderData.pickupTime.split(':')[0])) 
                  : null
                }
                onChange={(newValue) => {
                  if (newValue) {
                    handleFieldChange('pickupTime', format(newValue, 'HH:mm'));
                  }
                }}
                shouldDisableTime={shouldDisableTime}
                minutesStep={15}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.pickupTime,
                    helperText: errors.pickupTime || 'Store hours: 9 AM - 6 PM',
                    required: true,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Schedule />
                        </InputAdornment>
                      ),
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        {/* Delivery Address */}
        {showDeliveryAddress && (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Delivery Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={orderData.deliveryAddress.street}
                  onChange={(e) => handleFieldChange('deliveryAddress.street', e.target.value)}
                  error={!!errors['deliveryAddress.street']}
                  helperText={errors['deliveryAddress.street']}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={orderData.deliveryAddress.city}
                  onChange={(e) => handleFieldChange('deliveryAddress.city', e.target.value)}
                  error={!!errors['deliveryAddress.city']}
                  helperText={errors['deliveryAddress.city']}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="State"
                  value={orderData.deliveryAddress.state}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={orderData.deliveryAddress.zipCode}
                  onChange={(e) => handleFieldChange('deliveryAddress.zipCode', e.target.value)}
                  error={!!errors['deliveryAddress.zipCode']}
                  helperText={errors['deliveryAddress.zipCode']}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Delivery Instructions (Optional)"
                  value={orderData.deliveryAddress.instructions}
                  onChange={(e) => handleFieldChange('deliveryAddress.instructions', e.target.value)}
                  placeholder="Gate code, apartment number, etc."
                />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>

      {/* Special Occasion Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Special Occasion (Optional)
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                value={orderData.occasion}
                onChange={(e) => handleFieldChange('occasion', e.target.value)}
                displayEmpty
              >
                {occasions.map((occasion) => (
                  <MenuItem key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Help us customize your order</FormHelperText>
            </FormControl>
          </Grid>

          {orderData.occasion !== 'none' && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Recipient Name"
                  value={orderData.recipientName}
                  onChange={(e) => handleFieldChange('recipientName', e.target.value)}
                  placeholder="Who is this for?"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Occasion Details"
                  value={orderData.occasionDetails}
                  onChange={(e) => handleFieldChange('occasionDetails', e.target.value)}
                  placeholder="Any specific theme or message?"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Theme Colors (Optional)
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {themeColorOptions.map((color) => (
                    <Chip
                      key={color}
                      label={color}
                      onClick={() => {
                        const currentColors = orderData.themeColors || [];
                        const newColors = currentColors.includes(color)
                          ? currentColors.filter(c => c !== color)
                          : [...currentColors, color];
                        handleFieldChange('themeColors', newColors);
                      }}
                      color={orderData.themeColors?.includes(color) ? 'primary' : 'default'}
                      variant={orderData.themeColors?.includes(color) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Special Instructions (Optional)"
              value={orderData.specialInstructions}
              onChange={(e) => handleFieldChange('specialInstructions', e.target.value)}
              placeholder="Any allergies, dietary restrictions, or special requests?"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} size="large">
          Back
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          size="large"
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
          }}
        >
          Continue to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default GuestCheckoutForm;