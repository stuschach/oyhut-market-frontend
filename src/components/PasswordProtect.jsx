import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const PasswordProtect = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('site_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Change this password to whatever you want
    if (password === 'hdog') {
      setIsAuthenticated(true);
      sessionStorage.setItem('site_authenticated', 'true');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          mx: 2,
          textAlign: 'center',
        }}
      >
        <LockOutlined sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Site Under Development
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This site is currently in development. Please enter the password to continue.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            helperText={error ? 'Incorrect password' : ''}
            sx={{ mb: 2 }}
            autoFocus
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Enter Site
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PasswordProtect;