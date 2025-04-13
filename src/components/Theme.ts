// src/theme/executiveTheme.ts
import { createTheme } from '@mui/material/styles';

const clientsTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3F51B5',
      contrastText: '##FFFFFF',
    },
    secondary: {
      main: '##F5F5F5',
      contrastText: '#5A738E',
    },
    error: {
      main: '#D9534F', // Rojo para acciones críticas
    },
    background: {
      default: '##C5CAE9', // Fondo gris claro
      paper: '#FFFFFF', // Fondo de tarjetas/bloques
    },
    text: {
      primary: '#212121', // Texto principal oscuro
      secondary: '##757575', // Texto secundario
    },
    action: {
      hover: '##FF9800', // Hover suave
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#2A3F54',
    },
    h2: {
      fontSize: '2.0rem',
      fontWeight: 500,
      color: '#2A3F54',
    },
    button: {
      textTransform: 'none', // Botones sin mayúsculas
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            borderRadius: '8px',
            padding: '10px 25px',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default clientsTheme;
