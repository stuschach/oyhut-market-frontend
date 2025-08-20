import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Fade,
  Chip,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  LocalGroceryStore as StoreIcon,
  Home as HomeIcon,
  ShoppingBag as ProductsIcon,
  Phone as ContactIcon,
  Info as InfoIcon,
  Cake as BakeryIcon,
  WineBar as BeerWineIcon,
} from '@mui/icons-material';

import { logout } from '../../store/slices/authSlice';
import { toggleCart } from '../../store/slices/cartSlice';
import { selectCartItemsCount } from '../../store/slices/cartSlice';
import { toggleBakeryCart, selectBakeryCartItemsCount } from '../../store/slices/bakeryCartSlice';
import { toggleMobileMenu, closeMobileMenu } from '../../store/slices/uiSlice';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const bakeryCartItemsCount = useSelector(selectBakeryCartItemsCount);
  const { mobileMenuOpen } = useSelector((state) => state.ui);
  const { isAvailable: backendAvailable } = useSelector((state) => state.backend);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Store', path: '/products', icon: <ProductsIcon /> },
    { label: 'Bakery', path: '/bakery', icon: <BakeryIcon /> },
    { label: 'Beer & Wine', path: '/beer-wine', icon: <BeerWineIcon /> },
    { label: 'About', path: '/about', icon: <InfoIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactIcon /> },
  ];


  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.97)' 
            : `linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(255, 248, 243, 0.95))`,
          backdropFilter: 'blur(12px) saturate(150%)',
          borderBottom: `1px solid ${scrolled ? 'rgba(212, 114, 79, 0.15)' : 'rgba(212, 114, 79, 0.08)'}`,
          boxShadow: scrolled 
            ? '0 4px 20px rgba(212, 114, 79, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)' 
            : '0 2px 8px rgba(212, 114, 79, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${theme.palette.primary.main} 20%, 
              ${theme.palette.secondary.main} 50%, 
              ${theme.palette.primary.main} 80%, 
              transparent 100%)`,
            opacity: scrolled ? 0.6 : 1,
            transition: 'opacity 0.4s ease',
          },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1.5, minHeight: 70 }}>
            {isMobile && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  edge="start"
                  aria-label="menu"
                  onClick={() => dispatch(toggleMobileMenu())}
                  sx={{ 
                    mr: 2,
                    backgroundColor: 'rgba(212, 114, 79, 0.1)',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(212, 114, 79, 0.2)',
                    },
                  }}
                >
                  <MenuIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </motion.div>
            )}

            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                flexGrow: isMobile ? 1 : 0,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: theme.palette.gradients.primary,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                },
              }}
            >
              <motion.div
                animate={{ 
                  rotate: scrolled ? [0, 360] : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Box
                  component="img"
                  src="/logo.svg"
                  alt="The Market at Oyhut Logo"
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '12px',
                    mr: 2,
                    boxShadow: '0 4px 12px rgba(212, 114, 79, 0.15)',
                    objectFit: 'contain',
                  }}
                />
              </motion.div>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '0.95rem', md: '1.15rem' },
                    fontFamily: '"Playfair Display", serif',
                    background: theme.palette.gradients.text || theme.palette.gradients.primary,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  The Market
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    fontFamily: '"Playfair Display", serif',
                    background: theme.palette.gradients.text || theme.palette.gradients.primary,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    display: { xs: 'block', sm: 'none' },
                  }}
                >
                  The Market at Oyhut
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: { xs: 'none', sm: 'block', md: 'block' },
                  }}
                >
                  at Oyhut
                </Typography>
              </Box>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, mx: 3 }}>
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to={item.path}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: '0.925rem',
                        px: 2.5,
                        py: 1,
                        mx: 0.5,
                        borderRadius: '20px',
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        textTransform: 'none',
                        letterSpacing: '0.01em',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: theme.palette.gradients.primary,
                          opacity: 0,
                          transform: 'scale(0.8)',
                          borderRadius: '20px',
                          transition: 'all 0.3s ease',
                          zIndex: -1,
                        },
                        '&:hover': {
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(212, 114, 79, 0.2)',
                        },
                        '&:hover::before': {
                          opacity: 1,
                          transform: 'scale(1)',
                        },
                      }}
                    >
                      {item.label}
                      {item.label === 'Bakery' && backendAvailable && (
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            px: 1,
                            py: 0.25,
                            fontSize: '0.65rem',
                            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                            color: 'white',
                            borderRadius: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.02em',
                          }}
                        >
                          ORDER
                        </Box>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

              {/* Contact Us Button - Mobile Only */}
              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    size="small"
                    sx={{
                      minWidth: 'auto',
                      px: 2,
                      py: 0.8,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      borderRadius: '20px',
                      boxShadow: '0 2px 8px rgba(212, 114, 79, 0.25)',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                        boxShadow: '0 4px 12px rgba(212, 114, 79, 0.35)',
                      },
                    }}
                  >
                    Contact
                  </Button>
                </motion.div>
              )}


              {/* Bakery Cart Icon - Only show when backend is available */}
              {backendAvailable && (
                <Box sx={{ position: 'relative' }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={() => dispatch(toggleBakeryCart())}
                      sx={{ 
                        color: 'text.primary',
                        background: bakeryCartItemsCount > 0 
                          ? 'linear-gradient(135deg, rgba(212, 114, 79, 0.1) 0%, rgba(212, 114, 79, 0.05) 100%)'
                          : 'rgba(0, 0, 0, 0.04)',
                        border: `1px solid ${bakeryCartItemsCount > 0 ? 'rgba(212, 114, 79, 0.2)' : 'rgba(0, 0, 0, 0.08)'}`,
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                          background: bakeryCartItemsCount > 0
                            ? 'linear-gradient(135deg, rgba(212, 114, 79, 0.15) 0%, rgba(212, 114, 79, 0.08) 100%)'
                            : 'rgba(0, 0, 0, 0.08)',
                          borderColor: bakeryCartItemsCount > 0 ? 'rgba(212, 114, 79, 0.3)' : 'rgba(0, 0, 0, 0.12)',
                        },
                      }}
                    >
                      <Badge
                        badgeContent={bakeryCartItemsCount}
                        sx={{
                          '& .MuiBadge-badge': {
                            background: theme.palette.gradients.primary,
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            minWidth: 20,
                            height: 20,
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(212, 114, 79, 0.4)',
                            animation: bakeryCartItemsCount > 0 ? 'bounce 2s infinite' : 'none',
                            '@keyframes bounce': {
                              '0%, 100%': {
                                transform: 'translateY(0)',
                              },
                              '50%': {
                                transform: 'translateY(-3px)',
                              },
                            },
                          },
                        }}
                      >
                        <BakeryIcon sx={{ fontSize: 22 }} />
                      </Badge>
                    </IconButton>
                  </motion.div>
                </Box>
              )}

              {isAuthenticated ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      sx={{ 
                        color: 'text.primary',
                        background: 'rgba(212, 114, 79, 0.04)',
                        border: '1px solid rgba(212, 114, 79, 0.1)',
                        '&:hover': {
                          background: 'rgba(212, 114, 79, 0.08)',
                          borderColor: 'rgba(212, 114, 79, 0.2)',
                        },
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </motion.div>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    TransitionComponent={Fade}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 200,
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
                        border: '1px solid rgba(212, 114, 79, 0.08)',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        overflow: 'hidden',
                      },
                    }}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleProfileMenuClose}
                      sx={{ 
                        py: 1.5,
                        px: 2.5,
                        '&:hover': {
                          background: 'rgba(212, 114, 79, 0.04)',
                        },
                      }}
                    >
                      <PersonIcon sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="body2" fontWeight={500}>Profile</Typography>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/orders"
                      onClick={handleProfileMenuClose}
                      sx={{ 
                        py: 1.5,
                        px: 2.5,
                        '&:hover': {
                          background: 'rgba(212, 114, 79, 0.04)',
                        },
                      }}
                    >
                      <ProductsIcon sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
                      <Typography variant="body2" fontWeight={500}>Orders</Typography>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem 
                      onClick={handleLogout} 
                      sx={{ 
                        py: 1.5, 
                        px: 2.5,
                        color: 'error.main',
                        '&:hover': {
                          background: 'rgba(244, 67, 54, 0.04)',
                        },
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>Sign Out</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                backendAvailable && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      size="small"
                      sx={{
                        fontWeight: 700,
                        px: 3,
                        py: 1,
                        background: theme.palette.gradients.primary,
                        borderRadius: '20px',
                        boxShadow: '0 4px 14px rgba(212, 114, 79, 0.25)',
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          background: theme.palette.gradients.secondary,
                          boxShadow: '0 6px 20px rgba(212, 114, 79, 0.35)',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </motion.div>
                )
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => dispatch(closeMobileMenu())}
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
      >
        <Box sx={{ width: 280 }}>
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            alignItems: 'center',
            background: theme.palette.gradients.warm,
            borderBottom: `2px solid ${theme.palette.primary.main}`,
          }}>
            <Box
              component="img"
              src="/logo.svg"
              alt="The Market at Oyhut Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                mr: 2,
                boxShadow: '0 3px 10px rgba(212, 114, 79, 0.15)',
                objectFit: 'contain',
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: '"Playfair Display", serif', color: 'primary.main' }}>
                The Market
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', letterSpacing: '0.05em' }}>
                AT OYHUT
              </Typography>
            </Box>
          </Box>
          <Divider />
          <List sx={{ py: 2 }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem
                  component={Link}
                  to={item.path}
                  onClick={() => dispatch(closeMobileMenu())}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    py: 2,
                    px: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(212, 114, 79, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
          {isAuthenticated && (
            <>
              <Divider />
              <List sx={{ py: 2 }}>
                <ListItem
                  component={Link}
                  to="/profile"
                  onClick={() => dispatch(closeMobileMenu())}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    py: 2,
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(212, 114, 79, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/orders"
                  onClick={() => dispatch(closeMobileMenu())}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    py: 2,
                    px: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(212, 114, 79, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon><ProductsIcon /></ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleLogout();
                    dispatch(closeMobileMenu());
                  }}
                  sx={{
                    cursor: 'pointer',
                    py: 2,
                    px: 3,
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    },
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>

      {/* Spacer to prevent content from going under fixed header */}
      <Toolbar sx={{ minHeight: 70, mb: 2 }} />
    </>
  );
};

export default Header;