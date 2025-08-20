import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  WifiRounded as WifiIcon,
  ArrowForward as ArrowIcon,
  LocalShipping as ShippingIcon,
  Schedule as ScheduleIcon,
  Cake as BakeryIcon,
} from '@mui/icons-material';


const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated } = useSelector((state) => state.auth);


  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };


  return (
    <Box sx={{ background: theme.palette.background.default, overflow: 'hidden' }}>

      {/* Welcome Section with Stunning Typography */}
      <Container sx={{ pt: 12, pb: 2 }}>
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 4,
                fontSize: { xs: '3rem', md: '4.5rem' },
                lineHeight: 1.1,
                fontFamily: '"Playfair Display", serif',
                background: theme.palette.gradients.text,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to
              <br />
              The Market at Oyhut
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                fontWeight: 300,
                lineHeight: 1.8,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              Your neighborhood destination for fresh baked goods, custom cakes,
              artisanal desserts, and everyday essentials in Ocean Shores
            </Typography>
          </Box>
        </motion.div>
      </Container>


      {/* Store Sections with Photos */}
      <Box sx={{ pt: 0, pb: 4 }}>
        <Container>
          <Grid container spacing={6}>
            
            {/* Convenience Store Section */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: theme.shadows[8],
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            fontFamily: '"Playfair Display", serif',
                            color: theme.palette.primary.main,
                          }}
                        >
                          Your Complete Convenience Store
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: 500,
                            mb: 3,
                          }}
                        >
                          Everything You Need, When You Need It
                        </Typography>
                        <Typography
                          variant="body1"
                          paragraph
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            mb: 4,
                          }}
                        >
                          Our convenience store carries a full selection of everyday essentials. From beach supplies and sunscreen 
                          to snacks and beverages, we stock everything you need for your Ocean Shores visit. Browse our aisles for 
                          household items, health and beauty products, and grocery basics. Our beer and wine section features both 
                          local favorites and popular brands.
                        </Typography>
                        <Grid container spacing={2}>
                          {['Premium Beer & Wine', 'Grab-and-Go Snacks', 'Beach Essentials', 'Household Items'].map((feature) => (
                            <Grid item xs={6} key={feature}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ArrowIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {feature}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          height: { xs: 300, md: 400 },
                          backgroundImage: 'url(https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(212, 114, 79, 0.1) 0%, transparent 100%)',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>

            {/* Bakery Section */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: theme.shadows[8],
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 2 } }}>
                      <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            fontFamily: '"Playfair Display", serif',
                            color: theme.palette.primary.main,
                          }}
                        >
                          Artisan Bakery & Desserts
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: 500,
                            mb: 3,
                          }}
                        >
                          Handcrafted Sweets Made Daily
                        </Typography>
                        <Typography
                          variant="body1"
                          paragraph
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            mb: 4,
                          }}
                        >
                          Our bakery specializes in fresh desserts made daily on-site. We offer custom cakes for all occasions, 
                          including birthdays, weddings, and celebrations. Our display case features cupcakes, cookies, brownies, 
                          and seasonal desserts. We work with you to create the perfect dessert for your special event.
                        </Typography>
                        <Grid container spacing={2}>
                          {['Custom Cakes', 'Fresh Cupcakes', 'Cookies & Brownies', 'Seasonal Desserts'].map((feature) => (
                            <Grid item xs={6} key={feature}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ArrowIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {feature}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
                      <Box
                        sx={{
                          height: { xs: 300, md: 400 },
                          backgroundImage: 'url(https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(212, 114, 79, 0.1) 0%, transparent 100%)',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>

            {/* Coffee Section */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'white',
                    boxShadow: theme.shadows[8],
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: { xs: 4, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography
                          variant="h4"
                          gutterBottom
                          sx={{
                            fontWeight: 700,
                            fontFamily: '"Playfair Display", serif',
                            color: theme.palette.primary.main,
                          }}
                        >
                          Premium Coffee Bar
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: 500,
                            mb: 3,
                          }}
                        >
                          Expertly Crafted, Locally Roasted
                        </Typography>
                        <Typography
                          variant="body1"
                          paragraph
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                            mb: 4,
                          }}
                        >
                          Our coffee bar serves a full range of espresso-based drinks prepared by experienced baristas. We feature 
                          locally roasted coffee beans and offer everything from traditional espresso and cappuccino to specialty 
                          lattes and cold brew. All coffee drinks are made to order and can be customized to your preference. 
                          Fresh pastries from our bakery complement our coffee menu.
                        </Typography>
                        <Grid container spacing={2}>
                          {['Espresso Drinks', 'Locally Roasted Beans', 'Skilled Baristas', 'Perfect Pairings'].map((feature) => (
                            <Grid item xs={6} key={feature}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ArrowIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {feature}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          height: { xs: 300, md: 400 },
                          backgroundImage: 'url(https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(212, 114, 79, 0.1) 0%, transparent 100%)',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* Bakery Call-to-Action */}
      <Box sx={{ py: 10, background: theme.palette.gradients.warm }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                  background: theme.palette.gradients.primary,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Fresh From Our Bakery
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 600,
                  mx: 'auto',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  mb: 6,
                }}
              >
                Handcrafted daily with love and the finest ingredients. 
                Custom cakes, fresh cupcakes, cookies, and seasonal desserts available.
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 3,
              }}>
                <Grid container spacing={2} sx={{ maxWidth: 600, mb: 4 }}>
                  {[
                    'Custom Wedding & Birthday Cakes',
                    'Fresh Daily Cupcakes',
                    'Artisan Cookies & Brownies',
                    'Seasonal Specialties'
                  ].map((item) => (
                    <Grid item xs={12} sm={6} key={item}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: 1,
                      }}>
                        <BakeryIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {item}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    to="/bakery"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    sx={{
                      px: 6,
                      py: 2.5,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      borderRadius: 50,
                      background: theme.palette.gradients.primary,
                      boxShadow: theme.shadows[8],
                      '&:hover': {
                        background: theme.palette.gradients.secondary,
                        boxShadow: theme.shadows[12],
                      },
                    }}
                  >
                    Explore Our Bakery
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Store Info Section */}
      <Box sx={{ py: 10, background: theme.palette.primary.main, color: 'white' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                Visit Us Today!
              </Typography>
              <Typography variant="h6" paragraph sx={{ fontWeight: 300, mb: 4 }}>
                Open Daily: 8:00 AM - 8:00 PM
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                132 Oyhut Bay Blvd SW, Suite 107<br />
                Ocean Shores, WA 98569
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={<WifiIcon />}
                  label="Free Wi-Fi"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    fontWeight: 600,
                    py: 2.5,
                    px: 1,
                  }}
                />
                <Chip
                  icon={<ShippingIcon />}
                  label="Custom Orders"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    fontWeight: 600,
                    py: 2.5,
                    px: 1,
                  }}
                />
                <Chip
                  icon={<ScheduleIcon />}
                  label="Open 7 Days"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    fontWeight: 600,
                    py: 2.5,
                    px: 1,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-end' }, flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      borderRadius: 50,
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                    }}
                  >
                    Get Directions
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    href="tel:3609407777"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      borderRadius: 50,
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 2,
                      },
                    }}
                  >
                    Call: (360) 940-7777
                  </Button>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;