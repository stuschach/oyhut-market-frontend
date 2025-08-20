import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Skeleton,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Schedule as ScheduleIcon,
  LocalOffer as OfferIcon,
  Info as InfoIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Image as ImageIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, setHours, setMinutes } from 'date-fns';

import {
  fetchBakeryProductById,
  calculateProductPrice,
  checkProductAvailability,
  updateCustomization,
  clearSelectedProduct,
} from '../store/slices/bakerySlice';
import { addBakeryItem, openBakeryCart } from '../store/slices/bakeryCartSlice';
import { formatCurrency } from '../utils/helpers';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const BakeryProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { selectedProduct: product, loading, currentCustomization } = useSelector((state) => state.bakery);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [customizations, setCustomizations] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(setHours(setMinutes(new Date(), 0), 14)); // Default to 2:00 PM
  const [tabValue, setTabValue] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchBakeryProductById(id));
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      if (product.sizes?.length > 0) {
        const defaultSize = product.sizes.find(s => s.isDefault) || product.sizes[0];
        setSelectedSize(defaultSize.name);
      }
      
      if (product.flavors?.length > 0) {
        const defaultFlavor = product.flavors.find(f => f.available);
        if (defaultFlavor) setSelectedFlavor(defaultFlavor.name);
      }
      
      const minOrderDate = new Date();
      setPickupDate(minOrderDate);
      
      setPickupTime(setMinutes(setHours(new Date(), 10), 0));
      
      dispatch(updateCustomization({
        productId: product._id,
        options: {},
        price: product.basePrice,
      }));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (product && (selectedSize || Object.keys(customizations).length > 0)) {
      // Convert customizations object to array format expected by backend
      const optionsArray = Object.entries(customizations).map(([name, value]) => ({
        name,
        value
      }));
      
      dispatch(calculateProductPrice({
        productId: product._id,
        customizations: {
          size: selectedSize,
          flavor: selectedFlavor,
          options: optionsArray,
        },
      }));
    }
  }, [product, selectedSize, selectedFlavor, customizations, dispatch]);

  const handleCustomizationChange = (optionName, value) => {
    setCustomizations({
      ...customizations,
      [optionName]: value,
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= product.minimumOrderQuantity && 
        (!product.maximumOrderQuantity || newQuantity <= product.maximumOrderQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToOrder = async () => {
    // Guest checkout allowed - removed authentication check

    if (!pickupDate || !pickupTime) {
      toast.error('Please select pickup date and time');
      return;
    }

    console.log('Checking availability for:', {
      productId: product._id,
      productName: product.name,
      date: pickupDate ? pickupDate.toISOString() : new Date().toISOString(),
      isAuthenticated
    });

    // Temporarily skip availability check for testing
    const skipAvailabilityCheck = true; // Remove this line when backend is fully configured
    
    if (!skipAvailabilityCheck) {
      const availabilityCheck = await dispatch(checkProductAvailability({
        productId: product._id,
        date: pickupDate ? pickupDate.toISOString() : new Date().toISOString(),
      }));

      console.log('Availability check result:', availabilityCheck.payload);

      if (availabilityCheck.payload && !availabilityCheck.payload.isAvailable) {
        toast.error(availabilityCheck.payload.message || 'Product is not available for the selected date');
        return;
      }
    }

    // Convert customizations to array format for order data
    const customizationsArray = Object.entries(customizations).map(([name, value]) => ({
      name,
      value
    }));
    
    const orderData = {
      product,
      quantity,
      size: selectedSize,
      flavor: selectedFlavor,
      customizations: customizationsArray,
      specialInstructions,
      pickupDate,
      pickupTime,
      uploadedImage,
      totalPrice: (currentCustomization?.price || product.basePrice || 0) * quantity,
    };

    console.log('Navigating to checkout with orderData:', orderData);
    navigate('/bakery/checkout', { state: { orderData } });
  };

  const handleAddToCart = () => {
    if (!pickupDate || !pickupTime) {
      toast.error('Please select pickup date and time');
      return;
    }

    // Convert customizations to array format for cart
    const customizationsArray = Object.entries(customizations).map(([name, value]) => ({
      name,
      value
    }));

    dispatch(addBakeryItem({
      product,
      quantity,
      size: selectedSize,
      flavor: selectedFlavor,
      customizations: customizationsArray,
      specialInstructions,
      pickupDate,
      pickupTime,
    }));

    dispatch(openBakeryCart());
    toast.success(`${product.name} added to cart!`);
  };

  const getMinPickupDate = () => {
    return new Date();
  };

  if (loading || !product) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} width="60%" />
            <Skeleton variant="text" height={200} />
            <Skeleton variant="rectangular" height={60} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <CardMedia
              component="img"
              src={product.images?.[0]?.url || 'https://via.placeholder.com/600x600'}
              alt={product.name}
              sx={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            
            {product.images?.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {formatCurrency(currentCustomization.price || product.basePrice)}
                {product.sizes?.length > 1 && ' (price varies by size)'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            {product.description}
          </Typography>


          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
              <Tab label="Customize" />
              <Tab label="Details" />
              <Tab label="Nutrition" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {tabValue === 0 && (
                <Box>
                  {product.sizes?.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Size</InputLabel>
                      <Select
                        value={selectedSize}
                        label="Size"
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        {product.sizes.map((size) => (
                          <MenuItem key={size.name} value={size.name}>
                            {size.name} - {formatCurrency(size.price)}
                            {size.servings && ` (Serves ${size.servings})`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {product.flavors?.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Flavor</InputLabel>
                      <Select
                        value={selectedFlavor}
                        label="Flavor"
                        onChange={(e) => setSelectedFlavor(e.target.value)}
                      >
                        {product.flavors.filter(f => f.available).map((flavor) => (
                          <MenuItem key={flavor.name} value={flavor.name}>
                            {flavor.name}
                            {flavor.priceModifier > 0 && ` (+${formatCurrency(flavor.priceModifier)})`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {product.customizationOptions?.map((option) => (
                    <Box key={option.name} sx={{ mb: 3 }}>
                      <FormLabel component="legend" sx={{ mb: 1 }}>
                        {option.name} {option.required && <span style={{ color: 'red' }}>*</span>}
                      </FormLabel>

                      {option.type === 'single' && (
                        <RadioGroup
                          value={customizations[option.name] || ''}
                          onChange={(e) => handleCustomizationChange(option.name, e.target.value)}
                        >
                          {option.options.map((opt) => (
                            <FormControlLabel
                              key={opt.value}
                              value={opt.value}
                              control={<Radio />}
                              label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <span>{opt.label}</span>
                                  {opt.priceModifier > 0 && (
                                    <Chip
                                      label={`+${formatCurrency(opt.priceModifier)}`}
                                      size="small"
                                      color="primary"
                                      variant="outlined"
                                    />
                                  )}
                                </Box>
                              }
                            />
                          ))}
                        </RadioGroup>
                      )}

                      {option.type === 'multiple' && (
                        <Box>
                          {option.options.map((opt) => (
                            <FormControlLabel
                              key={opt.value}
                              control={
                                <Checkbox
                                  checked={customizations[option.name]?.includes(opt.value) || false}
                                  onChange={(e) => {
                                    const current = customizations[option.name] || [];
                                    const updated = e.target.checked
                                      ? [...current, opt.value]
                                      : current.filter(v => v !== opt.value);
                                    handleCustomizationChange(option.name, updated);
                                  }}
                                />
                              }
                              label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <span>{opt.label}</span>
                                  {opt.priceModifier > 0 && (
                                    <Chip
                                      label={`+${formatCurrency(opt.priceModifier)}`}
                                      size="small"
                                      color="primary"
                                      variant="outlined"
                                    />
                                  )}
                                </Box>
                              }
                            />
                          ))}
                        </Box>
                      )}

                      {option.type === 'text' && (
                        <TextField
                          fullWidth
                          value={customizations[option.name] || ''}
                          onChange={(e) => handleCustomizationChange(option.name, e.target.value)}
                          placeholder={option.placeholder}
                          inputProps={{ maxLength: option.maxLength }}
                          helperText={option.maxLength && `${(customizations[option.name] || '').length}/${option.maxLength} characters`}
                        />
                      )}

                      {option.type === 'number' && (
                        <TextField
                          fullWidth
                          type="number"
                          value={customizations[option.name] || ''}
                          onChange={(e) => handleCustomizationChange(option.name, e.target.value)}
                          inputProps={{ min: option.min, max: option.max }}
                        />
                      )}
                    </Box>
                  ))}

                  {product.isCustomizable && (
                    <Box sx={{ mb: 3 }}>
                      <FormLabel component="legend" sx={{ mb: 1 }}>
                        Upload Reference Image (Optional)
                      </FormLabel>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<ImageIcon />}
                        fullWidth
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </Button>
                      {uploadedImage && (
                        <Box sx={{ mt: 2 }}>
                          <img
                            src={uploadedImage}
                            alt="Reference"
                            style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }}
                          />
                        </Box>
                      )}
                    </Box>
                  )}

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Special Instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests or instructions..."
                    sx={{ mb: 3 }}
                  />
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Category"
                        secondary={product.category}
                      />
                    </ListItem>
                    {product.ingredients?.length > 0 && (
                      <ListItem>
                        <ListItemText
                          primary="Ingredients"
                          secondary={product.ingredients.join(', ')}
                        />
                      </ListItem>
                    )}
                    {product.allergens?.length > 0 && (
                      <ListItem>
                        <ListItemText
                          primary="Allergens"
                          secondary={
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                              {product.allergens.map((allergen) => (
                                <Chip
                                  key={allergen}
                                  label={allergen}
                                  color="warning"
                                  size="small"
                                />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                    )}
                    {product.preparationTime && (
                      <ListItem>
                        <ListItemText
                          primary="Preparation Time"
                          secondary={`${product.preparationTime.value} ${product.preparationTime.unit}`}
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>
              )}

              {tabValue === 2 && product.nutritionInfo && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Nutrition Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Per serving ({product.nutritionInfo.servingSize})
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Calories"
                        secondary={product.nutritionInfo.calories}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Total Fat"
                        secondary={`${product.nutritionInfo.totalFat}g`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Protein"
                        secondary={`${product.nutritionInfo.protein}g`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Total Carbs"
                        secondary={`${product.nutritionInfo.totalCarbs}g`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Sugars"
                        secondary={`${product.nutritionInfo.sugars}g`}
                      />
                    </ListItem>
                  </List>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Pickup Date"
                  value={pickupDate}
                  onChange={setPickupDate}
                  minDate={getMinPickupDate()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      helperText: 'Select your pickup date'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Pickup Time"
                  value={pickupTime}
                  onChange={setPickupTime}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      helperText: 'Select your pickup time'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="body1">Quantity:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= product.minimumOrderQuantity}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton
                onClick={() => handleQuantityChange(1)}
                disabled={product.maximumOrderQuantity && quantity >= product.maximumOrderQuantity}
              >
                <AddIcon />
              </IconButton>
            </Box>
            {product.minimumOrderQuantity > 1 && (
              <Typography variant="caption" color="text.secondary">
                Minimum: {product.minimumOrderQuantity}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Total:</Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
              {formatCurrency((currentCustomization.price || product.basePrice) * quantity)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Sticky Checkout Button for Mobile */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Paper
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                zIndex: 1200,
                borderTop: `2px solid ${theme.palette.primary.main}`,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Total Price
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  {formatCurrency((currentCustomization?.price || product.basePrice || 0) * quantity)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleAddToCart}
                  startIcon={<CartIcon />}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Add to Cart
                </Button>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ flex: 1 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleAddToOrder}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #D4724F 0%, #E6A38E 100%)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 20px rgba(212, 114, 79, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E6A38E 0%, #D4724F 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(212, 114, 79, 0.4)',
                      },
                    }}
                  >
                    Checkout Now
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons for Desktop */}
      {!isMobile && (
        <Box sx={{ position: 'fixed', bottom: 40, right: 40, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Fab
              variant="extended"
              color="primary"
              onClick={handleAddToCart}
              sx={{
                px: 3,
                py: 1,
                background: theme.palette.background.paper,
                color: theme.palette.primary.main,
                border: `2px solid ${theme.palette.primary.main}`,
                boxShadow: '0 4px 20px rgba(212, 114, 79, 0.2)',
                '&:hover': {
                  background: theme.palette.primary.main,
                  color: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(212, 114, 79, 0.3)',
                },
              }}
            >
              <CartIcon sx={{ mr: 1 }} />
              <Typography variant="button" sx={{ fontWeight: 600 }}>
                Add to Cart
              </Typography>
            </Fab>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <Fab
              variant="extended"
              color="primary"
              onClick={handleAddToOrder}
              sx={{
                px: 4,
                py: 1,
                background: 'linear-gradient(135deg, #D4724F 0%, #E6A38E 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(212, 114, 79, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E6A38E 0%, #D4724F 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(212, 114, 79, 0.4)',
                },
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.7rem', color: 'white' }}>
                  Total: {formatCurrency((currentCustomization?.price || product.basePrice || 0) * quantity)}
                </Typography>
                <Typography variant="button" sx={{ fontWeight: 700, color: 'white' }}>
                  Checkout Now
                </Typography>
              </Box>
            </Fab>
          </motion.div>
        </Box>
      )}

    </Container>
  );
};

export default BakeryProductDetailPage;