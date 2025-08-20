import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { formatCurrency } from '../../utils/helpers';

const AnimatedProductCard = ({ 
  product, 
  onAddToCart, 
  index = 0,
  isFavorite = false,
  onToggleFavorite 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      }
    },
    tap: {
      scale: 0.95,
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          background: (theme) => `${theme.palette.glassmorphism.background}`,
          backdropFilter: 'blur(20px)',
          border: (theme) => `1px solid ${theme.palette.glassmorphism.border}`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
            border: (theme) => `1px solid rgba(212, 114, 79, 0.2)`,
          }
        }}
      >
        {/* Image Container */}
        <Box
          component={Link}
          to={`/products/${product._id}`}
          sx={{
            display: 'block',
            position: 'relative',
            height: 240,
            overflow: 'hidden',
            textDecoration: 'none',
          }}
        >
          <motion.div
            variants={imageVariants}
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
              alt={product.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                '.MuiBox-root:hover &': {
                  opacity: 1,
                },
              }}
            />
          </motion.div>

          {/* Sale Badge */}
          {product.discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Chip
                label={`-${product.discount}%`}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  backgroundColor: 'error.main',
                  color: 'white',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
                }}
              />
            </motion.div>
          )}

          {/* Favorite Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.(product._id);
              }}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                },
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: 'error.main' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </motion.div>
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5 }}>
          <Typography
            variant="h6"
            component={Link}
            to={`/products/${product._id}`}
            sx={{
              textDecoration: 'none',
              color: 'text.primary',
              fontWeight: 600,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
              minHeight: '3.6em',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {product.name}
          </Typography>

          {product.category && (
            <Chip
              label={product.category.name}
              size="small"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(212, 114, 79, 0.1)',
                color: 'primary.main',
                fontWeight: 500,
              }}
            />
          )}

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {formatCurrency(product.price)}
            </Typography>
            {product.unit && (
              <Typography variant="body2" color="text.secondary">
                / {product.unit}
              </Typography>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                {formatCurrency(product.originalPrice)}
              </Typography>
            )}
          </Box>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={<CartIcon />}
              onClick={() => onAddToCart(product._id)}
              disabled={!product.inStock}
              sx={{
                py: 1.5,
                fontWeight: 600,
                background: product.inStock 
                  ? (theme) => theme.palette.gradients.primary
                  : 'grey.300',
                boxShadow: product.inStock 
                  ? '0 4px 20px rgba(212, 114, 79, 0.3)'
                  : 'none',
                '&:hover': {
                  boxShadow: product.inStock 
                    ? '0 6px 28px rgba(212, 114, 79, 0.4)'
                    : 'none',
                },
              }}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default AnimatedProductCard;