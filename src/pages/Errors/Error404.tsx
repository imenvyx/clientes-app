// src/pages/Error404.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Paper,
} from '@mui/material';
import { Home, Warning } from '@mui/icons-material';
import { OutletContainer } from 'components/OutletContainer';

const Error404 = () => {
  const history = useHistory();
  const theme = useTheme();

  return (
    <OutletContainer>
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 8,
            p: 4,
            textAlign: 'center',
            borderRadius: 4,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Warning
              sx={{
                fontSize: 100,
                color: theme.palette.error.main,
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: '4rem',
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
            }}
          >
            Oops... Página no encontrada!
          </Typography>
        </Box>
      </Container>
    </OutletContainer>
  );
};

export default Error404;
