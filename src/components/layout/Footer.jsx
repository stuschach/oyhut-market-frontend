import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              The Market at Oyhut
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your local grocery store and bakery in Ocean Shores, WA. 
              Offering fresh produce, bakery items, convenience items, and more.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to="/products"
                color="text.secondary"
                underline="hover"
              >
                Shop
              </MuiLink>
              <MuiLink
                component={Link}
                to="/about"
                color="text.secondary"
                underline="hover"
              >
                About Us
              </MuiLink>
              <MuiLink
                component={Link}
                to="/contact"
                color="text.secondary"
                underline="hover"
              >
                Contact
              </MuiLink>
              <MuiLink
                component={Link}
                to="/login"
                color="text.secondary"
                underline="hover"
              >
                Account
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Store Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  132 Oyhut Bay Blvd SW, Suite 107<br />
                  Ocean Shores, WA 98569
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  (360) 940-7777
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  oyhutbaymarketandbakery@gmail.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Store Hours
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TimeIcon fontSize="small" color="primary" />
              <Typography variant="body2" color="text.secondary">
                Open Daily: 8:00 AM - 8:00 PM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              We're here to serve you every day with fresh products and friendly service.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © {currentYear} The Market at Oyhut. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink
              component={Link}
              to="/privacy"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/terms"
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;