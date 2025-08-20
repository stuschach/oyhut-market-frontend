import React from 'react';
import { Alert, AlertTitle, Box, Typography, Button } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const StaticBakeryNotice = () => {
  return (
    <Alert 
      severity="info" 
      sx={{ 
        mb: 3, 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)',
        border: '1px solid #ffc107',
        '& .MuiAlert-icon': {
          color: '#f57c00'
        }
      }}
    >
      <AlertTitle sx={{ fontWeight: 700 }}>Browsing Mode - Online Ordering Coming Soon!</AlertTitle>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Welcome to our bakery catalog! Browse our delicious offerings below. 
        To place an order, please visit us in-store or call us directly.
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone fontSize="small" />
          <Typography variant="body2" fontWeight={600}>
            (360) 555-1234
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn fontSize="small" />
          <Typography variant="body2">
            123 Coastal Highway, Ocean Park
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Email fontSize="small" />
          <Typography variant="body2">
            bakery@oyhutmarket.com
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant="contained" 
        size="small" 
        sx={{ mt: 2 }}
        href="tel:3605551234"
        color="warning"
      >
        Call to Order
      </Button>
    </Alert>
  );
};

export default StaticBakeryNotice;