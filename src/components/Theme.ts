// src/theme/executiveTheme.ts
import { createTheme } from '@mui/material/styles';

const executiveTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3F51B5',
      light: '#757DE8',
      dark: '#002984',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6F00',
      light: '#FFA040',
      dark: '#C43E00',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#1976D2',
    },
    success: {
      main: '#388E3C',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
    divider: '#E0E0E0',
    action: {
      hover: 'rgba(63, 81, 181, 0.08)',
      selected: 'rgba(63, 81, 181, 0.16)',
      active: 'rgba(63, 81, 181, 0.24)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '8px 22px',
        },
        sizeLarge: {
          padding: '10px 28px',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            '&:hover': {
              backgroundColor: '#002984',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: '#3F51B5',
          boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#3F51B5',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(63, 81, 181, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(63, 81, 181, 0.12)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiSelect-select': {
            display: 'flex !important',
            alignItems: 'flex-start !important',
            justifyContent: 'flex-start !important',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.875rem',
          backgroundColor: 'rgba(33, 33, 33, 0.92)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default executiveTheme;
