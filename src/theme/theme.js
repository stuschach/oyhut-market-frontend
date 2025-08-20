import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D4724F', // Warm terracotta
      light: '#E09973',
      dark: '#B85A39',
      contrastText: '#fff',
    },
    secondary: {
      main: '#8B6F47', // Warm brown
      light: '#A68B65',
      dark: '#6B5333',
      contrastText: '#fff',
    },
    background: {
      default: '#FFF8F3', // Warm off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3D2817',
      secondary: '#6B5333',
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#F57C00',
    },
    info: {
      main: '#0288D1',
    },
    success: {
      main: '#388E3C',
    },
    // Custom gradients
    gradients: {
      primary: 'linear-gradient(135deg, #D4724F 0%, #E09973 100%)',
      secondary: 'linear-gradient(135deg, #8B6F47 0%, #A68B65 100%)',
      background: 'linear-gradient(180deg, #FFF8F3 0%, #FFEEE5 100%)',
      text: 'linear-gradient(135deg, #D4724F 0%, #B85A39 100%)',
      warm: 'linear-gradient(135deg, #FFF8F3 0%, #FFE8D6 100%)',
    },
    glassmorphism: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.04)',
    '0px 4px 16px rgba(0, 0, 0, 0.06)',
    '0px 8px 24px rgba(0, 0, 0, 0.08)',
    '0px 12px 32px rgba(0, 0, 0, 0.10)',
    '0px 16px 40px rgba(0, 0, 0, 0.12)',
    '0px 20px 48px rgba(0, 0, 0, 0.14)',
    '0px 24px 56px rgba(0, 0, 0, 0.16)',
    '0px 28px 64px rgba(0, 0, 0, 0.18)',
    '0px 32px 72px rgba(0, 0, 0, 0.20)',
    '0px 36px 80px rgba(0, 0, 0, 0.22)',
    '0px 40px 88px rgba(0, 0, 0, 0.24)',
    '0px 44px 96px rgba(0, 0, 0, 0.26)',
    '0px 48px 104px rgba(0, 0, 0, 0.28)',
    '0px 52px 112px rgba(0, 0, 0, 0.30)',
    '0px 56px 120px rgba(0, 0, 0, 0.32)',
    '0px 60px 128px rgba(0, 0, 0, 0.34)',
    '0px 64px 136px rgba(0, 0, 0, 0.36)',
    '0px 68px 144px rgba(0, 0, 0, 0.38)',
    '0px 72px 152px rgba(0, 0, 0, 0.40)',
    '0px 76px 160px rgba(0, 0, 0, 0.42)',
    '0px 80px 168px rgba(0, 0, 0, 0.44)',
    '0px 84px 176px rgba(0, 0, 0, 0.46)',
    '0px 88px 184px rgba(0, 0, 0, 0.48)',
    '0px 92px 192px rgba(0, 0, 0, 0.50)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, var(--mui-palette-primary-main) 0%, var(--mui-palette-primary-light) 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--mui-palette-primary-dark) 0%, var(--mui-palette-primary-main) 100%)',
            boxShadow: '0px 12px 32px rgba(212, 114, 79, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 12px 48px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
            },
            '&.Mui-focused': {
              boxShadow: '0px 4px 24px rgba(212, 114, 79, 0.15)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          backdropFilter: 'blur(8px)',
          background: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;