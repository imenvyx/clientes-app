// components/LoadingFallback.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingFallbackProps {
  message?: string;
  size?: number;
}

/**
 * A fallback component that displays a loading spinner and an optional message.
 *
 * @param {LoadingFallbackProps} props - The props for the LoadingFallback component.
 * @param {string} [props.message='Cargando contenido...'] - The message to display below the spinner.
 * @param {number} [props.size=40] - The size of the loading spinner.
 * @returns  The rendered LoadingFallback component.
 */
const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Cargando contenido...',
  size = 40,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: 'primary.main',
          animationDuration: '550ms',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'text.primary',
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingFallback;
