import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Skeleton,
  Alert,
  Badge,
  useTheme,
} from '@mui/material';
import {
  Cake as CakeIcon,
  Cookie as CookieIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  LocalOffer as OfferIcon,
  Storefront as StoreIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import {
  fetchBakeryProducts,
  fetchBakeryCategories,
  setFilters,
  resetFilters,
} from '../store/slices/bakerySlice';
import { addBakeryItem, openBakeryCart } from '../store/slices/bakeryCartSlice';
import { formatCurrency } from '../utils/helpers';
import { toast } from 'react-toastify';
import StaticBakeryNotice from '../components/bakery/StaticBakeryNotice';

const categoryIcons = {
  all: <StoreIcon />,
  pastries: <CakeIcon />,
  'custom-cakes': <StarIcon />,
  cupcakes: <CakeIcon />,
  cookies: <CookieIcon />,
  muffins: <CakeIcon />,
  brownies: <CookieIcon />,
};

const categoryLabels = {
  all: 'All Items',
  pastries: 'Pastries & Pies',
  'custom-cakes': 'Custom Cakes',
  cupcakes: 'Cupcakes',
  cookies: 'Cookies',
  muffins: 'Muffins',
  brownies: 'Brownies',
};

const BakeryProductCard = ({ product, onProductClick, onQuickOrder, isBackendAvailable }) => {
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: theme.palette.gradients.primary,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {product.popularItem && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            >
              <Chip
                label="Popular"
                size="small"
                icon={<StarIcon />}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
                  background: theme.palette.gradients.primary,
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </motion.div>
          )}
          
          {product.seasonal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
            >
              <Chip
                label="Seasonal"
                size="small"
                icon={<OfferIcon />}
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: 1,
                  background: theme.palette.gradients.secondary,
                  color: 'white',
                  fontWeight: 600,
                }}
              />
            </motion.div>
          )}

          <CardMedia
            component="div"
            sx={{
              height: 280,
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              },
            }}
            onClick={() => onProductClick(product._id)}
          >
            <Box
              component="img"
              src={product.image || 'https://via.placeholder.com/300x250'}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease, transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ position: 'absolute', top: 0, left: 0 }}
              />
            )}
          </CardMedia>
        </Box>

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
              background: theme.palette.gradients.text || 'inherit',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateX(4px)',
              },
            }}
            onClick={() => onProductClick(product._id)}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.5em',
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                background: theme.palette.gradients.primary,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {product.sizes && product.sizes.length > 0
                ? `From ${formatCurrency(Math.min(...product.sizes.map(s => s.price)))}`
                : formatCurrency(product.basePrice)}
            </Typography>
          </Box>


          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {product.allergens?.slice(0, 3).map((allergen, index) => (
              <motion.div
                key={allergen}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Chip
                  label={allergen}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.7rem',
                    borderColor: 'divider',
                    background: theme.palette.background.paper,
                  }}
                />
              </motion.div>
            ))}
            {product.allergens?.length > 3 && (
              <Chip
                label={`+${product.allergens.length - 3}`}
                size="small"
                sx={{ 
                  fontSize: '0.7rem',
                  background: theme.palette.action.selected,
                }}
              />
            )}
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <IconButton 
              size="small" 
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                color: isFavorite ? 'error.main' : 'text.secondary',
                transition: 'all 0.3s ease',
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </motion.div>
          <Button
            variant="contained"
            onClick={() => onQuickOrder(product)}
            startIcon={product.isCustomizable ? <StarIcon /> : null}
            disabled={!isBackendAvailable}
            sx={{
              background: isBackendAvailable ? theme.palette.gradients.primary : 'grey.400',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                background: isBackendAvailable ? theme.palette.gradients.secondary : 'grey.500',
                transform: isBackendAvailable ? 'translateY(-2px)' : 'none',
              },
              '&.Mui-disabled': {
                background: 'grey.400',
                color: 'white',
              },
            }}
          >
            {!isBackendAvailable ? 'Call to Order' : (product.isCustomizable ? 'Customize' : 'Order Now')}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

const BakeryPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { products, categories, loading, filters } = useSelector((state) => state.bakery);
  const { isAvailable: isBackendAvailable, isLoading: backendLoading } = useSelector((state) => state.backend);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Always fetch data immediately - the service layer handles static fallback
    dispatch(fetchBakeryCategories());
    dispatch(fetchBakeryProducts(filters));
  }, [dispatch, filters]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      dispatch(setFilters({ category: '' }));
    } else {
      dispatch(setFilters({ category }));
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/bakery/products/${productId}`);
  };

  const handleQuickOrder = (product) => {
    // If backend is not available, show phone number to call
    if (!isBackendAvailable) {
      window.location.href = 'tel:3605551234';
      return;
    }
    
    if (product.isCustomizable || product.requiresAdvanceOrder) {
      navigate(`/bakery/products/${product._id}`);
    } else {
      // Add simple products directly to cart
      dispatch(addBakeryItem({
        product,
        quantity: 1,
        size: product.sizes?.[0]?.name || null, // Default to first size if available
        flavor: product.flavors?.find(f => f.available)?.name || null, // Default to first available flavor
      }));
      dispatch(openBakeryCart());
      toast.success(`${product.name} added to cart!`);
    }
  };

  const getCategoryCount = (category) => {
    if (category === 'all') return products.length;
    return products.filter(p => p.category === category).length;
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.gradients.background,
        pb: 6,
      }}
    >
      <Container sx={{ pt: 4 }}>
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                mb: 3,
                fontFamily: '"Playfair Display", serif',
                background: theme.palette.gradients.text,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Bakery
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 800,
                mx: 'auto',
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              Fresh baked desserts made daily with love and the finest ingredients - custom cakes, cupcakes, cookies, and more.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                fontSize: '1.1rem',
              }}
            >
              🍰 Custom orders available
            </Typography>
          </Box>
        </motion.div>

        {!isBackendAvailable && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StaticBakeryNotice />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 4, 
              background: theme.palette.glassmorphism.background,
              backdropFilter: theme.palette.glassmorphism.backdropFilter,
              border: theme.palette.glassmorphism.border,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={selectedCategory}
              onChange={(e, value) => handleCategoryChange(value)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  minHeight: 80,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: theme.palette.action.hover,
                  },
                  '&.Mui-selected': {
                    background: theme.palette.gradients.primary,
                    color: 'white',
                  },
                },
              }}
            >
              {Object.entries(categoryLabels).map(([value, label]) => (
                <Tab
                  key={value}
                  label={label}
                  value={value}
                  icon={
                    <Badge 
                      badgeContent={getCategoryCount(value)} 
                      color="secondary"
                      sx={{
                        '& .MuiBadge-badge': {
                          background: theme.palette.gradients.secondary,
                          color: 'white',
                          fontWeight: 700,
                        },
                      }}
                    >
                      {categoryIcons[value]}
                    </Badge>
                  }
                />
              ))}
            </Tabs>
          </Paper>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <Grid container spacing={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <Skeleton variant="rectangular" height={280} />
                      <CardContent>
                        <Skeleton variant="text" height={32} />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  No products found in this category
                </Typography>
              </Paper>
            </motion.div>
          ) : (
            <Grid container spacing={3}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BakeryProductCard
                      product={product}
                      onProductClick={handleProductClick}
                      onQuickOrder={handleQuickOrder}
                      isBackendAvailable={isBackendAvailable}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Box 
            sx={{ 
              mt: 8, 
              p: 5, 
              background: theme.palette.gradients.primary,
              color: 'white', 
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  Need a Custom Cake?
                </Typography>
                <Typography variant="h6" paragraph sx={{ fontWeight: 300 }}>
                  We specialize in custom cakes for all occasions. From birthdays to weddings, 
                  let us create something special for you!
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <motion.div whileHover={{ scale: isBackendAvailable ? 1.05 : 1 }} whileTap={{ scale: isBackendAvailable ? 0.95 : 1 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => isBackendAvailable ? handleCategoryChange('custom-cakes') : window.location.href = 'tel:3605551234'}
                    disabled={!isBackendAvailable}
                    sx={{
                      backgroundColor: isBackendAvailable ? 'white' : 'grey.300',
                      color: isBackendAvailable ? theme.palette.primary.main : 'grey.600',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      boxShadow: theme.shadows[8],
                      '&:hover': {
                        backgroundColor: isBackendAvailable ? 'grey.100' : 'grey.300',
                        transform: isBackendAvailable ? 'translateY(-2px)' : 'none',
                        boxShadow: isBackendAvailable ? theme.shadows[12] : theme.shadows[8],
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'grey.300',
                        color: 'grey.600',
                      },
                    }}
                  >
                    {isBackendAvailable ? 'Browse Custom Cakes' : 'Call to Order Custom Cakes'}
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BakeryPage;