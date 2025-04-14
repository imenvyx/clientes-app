// src/pages/Error404.tsx
import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { OutletContainer } from 'components/OutletContainer';
import { useTranslation } from 'react-i18next';

/**
 * Error404 component renders a 404 error page with a warning icon and a message.
 * It uses Material-UI for styling and supports translations.
 *
 * @returns The rendered 404 error page component.
 */
const Error404 = () => {
  const theme = useTheme();
  const { t } = useTranslation();

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
            {t('error.notFound404')}
          </Typography>
        </Box>
      </Container>
    </OutletContainer>
  );
};

export default Error404;
