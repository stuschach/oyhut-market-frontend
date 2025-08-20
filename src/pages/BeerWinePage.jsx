import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  Rating,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
} from '@mui/material';
import {
  LocalBar as BeerIcon,
  WineBar as WineIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ExpandMore as ExpandMoreIcon,
  LocalOffer as OfferIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Store as StoreIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const BeerWinePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  // Mock data for beers and wines
  const products = [
    // Craft Beers
    {
      id: 1,
      name: 'Cascade Blonde Ale',
      category: 'beer',
      subcategory: 'Craft Beer',
      origin: 'Seattle, WA',
      abv: '5.2%',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=600',
      description: 'A crisp, refreshing blonde ale with subtle citrus notes and a clean finish. Perfect for beach days.',
      rating: 4.5,
      reviews: 128,
      featured: true,
      pairings: ['Grilled seafood', 'Light salads', 'Soft cheeses'],
    },
    {
      id: 2,
      name: 'Pike Place IPA',
      category: 'beer',
      subcategory: 'IPA',
      origin: 'Seattle, WA',
      abv: '6.3%',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600',
      description: 'Bold hop character with notes of pine and grapefruit. A true Pacific Northwest classic.',
      rating: 4.7,
      reviews: 256,
      featured: true,
      pairings: ['Spicy foods', 'Sharp cheeses', 'BBQ'],
    },
    {
      id: 3,
      name: 'Coastal Wheat',
      category: 'beer',
      subcategory: 'Wheat Beer',
      origin: 'Ocean Shores, WA',
      abv: '4.8%',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600',
      description: 'Light and refreshing wheat beer with hints of orange peel and coriander.',
      rating: 4.3,
      reviews: 89,
      featured: false,
      pairings: ['Seafood', 'Summer salads', 'Citrus desserts'],
    },
    // Red Wines
    {
      id: 4,
      name: 'Columbia Crest Cabernet Sauvignon',
      category: 'wine',
      subcategory: 'Red Wine',
      origin: 'Columbia Valley, WA',
      abv: '13.5%',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
      description: 'Rich and full-bodied with notes of blackberry, cedar, and vanilla. Aged 18 months in oak.',
      rating: 4.8,
      reviews: 342,
      featured: true,
      pairings: ['Red meat', 'Aged cheeses', 'Dark chocolate'],
    },
    {
      id: 5,
      name: 'Chateau Ste. Michelle Merlot',
      category: 'wine',
      subcategory: 'Red Wine',
      origin: 'Washington State',
      abv: '13.5%',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600',
      description: 'Smooth and elegant with plum and cherry flavors, complemented by subtle spice notes.',
      rating: 4.6,
      reviews: 218,
      featured: false,
      pairings: ['Pasta', 'Roasted vegetables', 'Soft cheeses'],
    },
    // White Wines
    {
      id: 6,
      name: 'Pacific Rim Riesling',
      category: 'wine',
      subcategory: 'White Wine',
      origin: 'Columbia Valley, WA',
      abv: '11.5%',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600',
      description: 'Crisp and refreshing with bright acidity, featuring notes of green apple and honey.',
      rating: 4.5,
      reviews: 156,
      featured: true,
      pairings: ['Asian cuisine', 'Seafood', 'Fruit desserts'],
    },
    {
      id: 7,
      name: 'Coastal Chardonnay',
      category: 'wine',
      subcategory: 'White Wine',
      origin: 'Monterey, CA',
      abv: '13%',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa2?w=600',
      description: 'Buttery and rich with tropical fruit flavors and a hint of vanilla from oak aging.',
      rating: 4.4,
      reviews: 124,
      featured: false,
      pairings: ['Grilled chicken', 'Cream sauces', 'Mild cheeses'],
    },
    // Domestic Beers
    {
      id: 8,
      name: 'Budweiser',
      category: 'beer',
      subcategory: 'Domestic',
      origin: 'USA',
      abv: '5%',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1521572435469-e30ccd231c7d?w=600',
      description: 'Classic American lager with a clean, crisp taste.',
      rating: 3.8,
      reviews: 456,
      featured: false,
      pairings: ['Burgers', 'Pizza', 'Wings'],
    },
    {
      id: 9,
      name: 'Coors Light',
      category: 'beer',
      subcategory: 'Light Beer',
      origin: 'USA',
      abv: '4.2%',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1504502350688-00f5d59bbdeb?w=600',
      description: 'Light and refreshing with a clean finish.',
      rating: 3.6,
      reviews: 389,
      featured: false,
      pairings: ['Light snacks', 'Salads', 'Grilled fish'],
    },
  ];

  const categories = {
    all: { label: 'All Beverages', icon: <BeerIcon />, count: products.length },
    beer: { label: 'Beer Selection', icon: <BeerIcon />, count: products.filter(p => p.category === 'beer').length },
    wine: { label: 'Wine Collection', icon: <WineIcon />, count: products.filter(p => p.category === 'wine').length },
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const ProductCard = ({ product, index }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      layout
      transition={{ delay: index * 0.05 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: theme.palette.background.paper,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[12],
            borderColor: theme.palette.primary.main,
            '& .product-image': {
              transform: 'scale(1.05)',
            },
          },
        }}
        onClick={() => setSelectedProduct(product)}
      >
        {product.featured && (
          <Chip
            label="Featured"
            size="small"
            icon={<StarIcon />}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1,
              background: theme.palette.gradients.primary,
              color: 'white',
              fontWeight: 600,
            }}
          />
        )}
        
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(product.id);
            }}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            {favorites.has(product.id) ? (
              <FavoriteIcon sx={{ color: 'error.main', fontSize: 20 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Box>

        <CardMedia
          component="div"
          sx={{
            height: 260,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            className="product-image"
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }}
          />
        </CardMedia>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontFamily: '"Playfair Display", serif',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {product.origin}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {product.abv}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating} readOnly size="small" precision={0.1} />
            <Typography variant="caption" color="text.secondary">
              ({product.reviews})
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
              minHeight: '2.5em',
            }}
          >
            {product.description}
          </Typography>

          <Chip
            label={product.subcategory}
            size="small"
            variant="outlined"
            sx={{
              borderColor: theme.palette.divider,
              fontSize: '0.75rem',
            }}
          />
        </CardContent>

        <Box
          sx={{
            p: 3,
            pt: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            ${product.price}
          </Typography>
          <Chip
            icon={<StoreIcon />}
            label="In Store"
            sx={{
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark,
              fontWeight: 600,
            }}
          />
        </Box>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.gradients.background, pb: 8 }}>
      <Container sx={{ pt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
              Beer & Wine Selection
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
              Carefully curated collection of craft beers, fine wines, and local favorites - 
              perfect for any occasion or palate.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                fontSize: '1.1rem',
              }}
            >
              🍺 Available in store only - must be 21+
            </Typography>
          </Box>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              mb: 5,
              background: theme.palette.glassmorphism.background,
              backdropFilter: theme.palette.glassmorphism.backdropFilter,
              border: theme.palette.glassmorphism.border,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={selectedCategory}
              onChange={(e, value) => setSelectedCategory(value)}
              variant={isMobile ? 'fullWidth' : 'standard'}
              centered={!isMobile}
              sx={{
                '& .MuiTab-root': {
                  minHeight: 72,
                  fontSize: '1rem',
                  fontWeight: 500,
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
              {Object.entries(categories).map(([key, value]) => (
                <Tab
                  key={key}
                  label={value.label}
                  value={key}
                  icon={
                    <Badge
                      badgeContent={value.count}
                      color="secondary"
                      sx={{
                        '& .MuiBadge-badge': {
                          background: theme.palette.gradients.secondary,
                          color: 'white',
                          fontWeight: 700,
                        },
                      }}
                    >
                      {value.icon}
                    </Badge>
                  }
                />
              ))}
            </Tabs>
          </Paper>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Grid container spacing={4} sx={{ mb: 5 }}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {selectedCategory === 'all' ? 'All Beverages' : selectedCategory === 'beer' ? 'Our Beer Selection' : 'Our Wine Collection'}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {selectedCategory === 'beer' 
                  ? 'From local craft breweries to classic favorites, our beer selection offers something for every taste. We feature rotating seasonal selections and limited releases from Pacific Northwest breweries.'
                  : selectedCategory === 'wine'
                  ? 'Discover our carefully selected wines from Washington State vineyards and beyond. Whether you prefer bold reds or crisp whites, our collection includes perfect pairings for any occasion.'
                  : 'Browse our complete selection of beers and wines. We pride ourselves on offering both local favorites and international selections at competitive prices.'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Accordion
                expanded={expandedAccordion === 'faq'}
                onChange={handleAccordionChange('faq')}
                sx={{
                  background: theme.palette.background.paper,
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon color="primary" />
                    <Typography variant="h6">Buying Guide</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" paragraph>
                    <strong>ID Required:</strong> Valid ID required for all alcohol purchases. Must be 21+.
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Special Orders:</strong> Can't find what you're looking for? Ask about special orders!
                  </Typography>
                  <Typography variant="body2">
                    <strong>Case Discounts:</strong> Save 10% when you buy by the case (beer or wine).
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Grid container spacing={3}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} index={index} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>

        {/* Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Paper
            sx={{
              mt: 8,
              p: { xs: 4, md: 6 },
              background: theme.palette.gradients.primary,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    fontFamily: '"Playfair Display", serif',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  Weekly Beer & Wine Specials
                </Typography>
                <Typography
                  variant="h6"
                  paragraph
                  sx={{
                    fontWeight: 300,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  Check out our rotating selection of discounted beers and wines. 
                  New specials every Friday!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, position: 'relative', zIndex: 1 }}>
                  <Chip
                    icon={<OfferIcon />}
                    label="10% Off Wine Cases"
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    icon={<OfferIcon />}
                    label="Mix & Match 6-Packs"
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      position: 'relative',
                      zIndex: 1,
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                    }}
                  >
                    View All Specials
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      {/* Product Detail Dialog */}
      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
      >
        {selectedProduct && (
          <>
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => setSelectedProduct(null)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  zIndex: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              <CardMedia
                component="img"
                height="400"
                image={selectedProduct.image}
                alt={selectedProduct.name}
                sx={{ objectFit: 'cover' }}
              />
            </Box>
            <DialogContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {selectedProduct.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  {selectedProduct.origin}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {selectedProduct.abv}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={selectedProduct.rating} readOnly size="small" precision={0.1} />
                  <Typography variant="body2" color="text.secondary">
                    ({selectedProduct.reviews} reviews)
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" paragraph>
                {selectedProduct.description}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Perfect Pairings
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedProduct.pairings.map((pairing, index) => (
                    <Chip
                      key={index}
                      label={pairing}
                      variant="outlined"
                      sx={{ borderColor: theme.palette.divider }}
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  ${selectedProduct.price}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    size="large"
                    onClick={() => handleToggleFavorite(selectedProduct.id)}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {favorites.has(selectedProduct.id) ? (
                      <FavoriteIcon sx={{ color: 'error.main' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                    <Chip
                      icon={<StoreIcon />}
                      label="Available In Store"
                      sx={{
                        backgroundColor: theme.palette.success.light,
                        color: theme.palette.success.dark,
                        fontWeight: 600,
                        px: 2,
                        py: 3,
                        fontSize: '1rem',
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PhoneIcon />}
                      onClick={() => window.location.href = 'tel:3609407777'}
                      sx={{
                        borderColor: theme.palette.divider,
                      }}
                    >
                      Call: (360) 940-7777
                    </Button>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default BeerWinePage;