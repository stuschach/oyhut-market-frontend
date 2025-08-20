import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../services/api';

const ContactPage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(false);
    
    try {
      await api.post('/contact', data);
      setSuccess(true);
      reset();
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '(360) 940-7777',
      link: 'tel:3609407777',
    },
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'oyhutbaymarketandbakery@gmail.com',
      link: 'mailto:oyhutbaymarketandbakery@gmail.com',
    },
    {
      icon: <LocationIcon />,
      title: 'Address',
      content: '132 Oyhut Bay Blvd SW, Suite 107\nOcean Shores, WA 98569',
      link: 'https://maps.google.com/?q=132+Oyhut+Bay+Blvd+SW+Ocean+Shores+WA',
    },
    {
      icon: <TimeIcon />,
      title: 'Hours',
      content: 'Open Daily\n8:00 AM - 8:00 PM',
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
            Contact Us
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
            We'd love to hear from you! Drop by our store, give us a call, or send us a message.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: 2,
              fontSize: '1.1rem',
            }}
          >
            📍 132 Oyhut Bay Blvd SW, Ocean Shores
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Get in Touch
            </Typography>
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...register('firstName', { required: 'First name is required' })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...register('lastName', { required: 'Last name is required' })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone (optional)"
                    {...register('phone')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    {...register('subject', { required: 'Subject is required' })}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    endIcon={<SendIcon />}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {contactInfo.map((info, index) => (
              <Card key={index} elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        p: 1.5,
                        borderRadius: 2,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {info.title}
                      </Typography>
                      {info.link ? (
                        <Typography
                          component="a"
                          href={info.link}
                          target={info.title === 'Address' ? '_blank' : undefined}
                          rel={info.title === 'Address' ? 'noopener noreferrer' : undefined}
                          sx={{
                            color: 'text.primary',
                            textDecoration: 'none',
                            whiteSpace: 'pre-line',
                            '&:hover': {
                              color: 'primary.main',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {info.content}
                        </Typography>
                      ) : (
                        <Typography sx={{ whiteSpace: 'pre-line' }}>
                          {info.content}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ 
                    backgroundColor: 'action.hover',
                    '&:hover': { backgroundColor: 'action.selected' },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ 
                    backgroundColor: 'action.hover',
                    '&:hover': { backgroundColor: 'action.selected' },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Paper sx={{ overflow: 'hidden' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2703.1234567890123!2d-124.1567890!3d46.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sOyhut+Bay+Market+%26+Bakery!5e0!3m2!1sen!2sus!4v1234567890123"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The Market at Oyhut Location"
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default ContactPage;