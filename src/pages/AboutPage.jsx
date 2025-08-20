import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  LocalGroceryStore as GroceryIcon,
  Cake as BakeryIcon,
  Coffee as CoffeeIcon,
  CardGiftcard as GiftIcon,
  Wifi as WifiIcon,
  People as PeopleIcon,
  Favorite as HeartIcon,
  Star as StarIcon,
  EmojiNature as NatureIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const AboutPage = () => {
  const theme = useTheme();
  
  const features = [
    {
      icon: <GroceryIcon fontSize="large" />,
      title: 'Fresh Groceries',
      description: 'Local and organic produce, dairy products, and everyday essentials',
    },
    {
      icon: <BakeryIcon fontSize="large" />,
      title: 'Bakery',
      description: 'Fresh baked goods daily, custom cakes for special occasions',
    },
    {
      icon: <CoffeeIcon fontSize="large" />,
      title: 'Espresso Bar',
      description: 'Premium coffee drinks and cozy atmosphere',
    },
    {
      icon: <GiftIcon fontSize="large" />,
      title: 'Gift Shop',
      description: 'Unique gifts, local crafts, and beach-themed items',
    },
  ];

  const values = [
    {
      icon: <PeopleIcon />,
      title: 'Community First',
      description: 'Supporting local farmers and producers',
    },
    {
      icon: <HeartIcon />,
      title: 'Family Owned',
      description: 'Proudly serving Ocean Shores since opening',
    },
    {
      icon: <StarIcon />,
      title: 'Quality Products',
      description: 'Carefully selected items you won\'t find elsewhere',
    },
    {
      icon: <NatureIcon />,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices',
    },
  ];

  return (
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
            About Us
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
            Your local family-owned convenience store, bakery, and coffee bar bringing quality products 
            and warm hospitality to Ocean Shores.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: 2,
              fontSize: '1.1rem',
            }}
          >
            ❤️ Proudly serving our community since opening
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 4, 
              height: '100%',
              backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 'inherit',
              },
            }}
          >
            <Box sx={{ position: 'relative', color: 'white' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                The Market at Oyhut is owned and operated by Janna, 
                who is passionate about bringing quality products and services to the Ocean Shores community.
              </Typography>
              <Typography variant="body1" paragraph>
                We pride ourselves on offering specialty items you won't find anywhere else in Ocean Shores. 
                From fresh local produce to custom-made cakes, our goal is to be your one-stop shop for 
                all your grocery and bakery needs.
              </Typography>
              <Typography variant="body1">
                Located conveniently at 132 Oyhut Bay Blvd SW, we're here to serve you daily from 
                8:00 AM to 8:00 PM with a smile and the personal touch that only a family-owned 
                business can provide.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  What Makes Us Special
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Unique Selection"
                      secondary="Specialty items you won't find anywhere else in Ocean Shores"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PeopleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Personal Service"
                      secondary="Get to know us - we're here to help with a friendly smile"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WifiIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Free Wi-Fi"
                      secondary="Stay connected while enjoying our espresso bar"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TimeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Convenient Hours"
                      secondary="Open daily 8 AM - 8 PM for your convenience"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip 
                label="Family Owned" 
                color="primary" 
                icon={<HeartIcon />}
                sx={{ py: 2.5 }}
              />
              <Chip 
                label="Local Business" 
                color="secondary" 
                icon={<NatureIcon />}
                sx={{ py: 2.5 }}
              />
              <Chip 
                label="Since Opening" 
                color="success" 
                icon={<StarIcon />}
                sx={{ py: 2.5 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, mb: 4 }}>
        What We Offer
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
          Our Values
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {values.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{value.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body2">
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Visit Us Today!
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          We look forward to welcoming you to The Market at Oyhut. Whether you're looking for 
          fresh groceries, a custom cake, or just a great cup of coffee, we're here to serve you.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            132 Oyhut Bay Blvd SW, Suite 107
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ocean Shores, WA 98569
          </Typography>
          <Typography variant="h6" color="primary">
            (360) 940-7777
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;