// components/LoadingFallback.tsx
import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingFallbackProps {
  message?: string;
  size?: number;
}

/**
 * A fallback component that displays a loading spinner and an optional message.
 *
 * @returns  The rendered LoadingFallback component.
 */
const LoadingFallback: React.FC<LoadingFallbackProps> = () => {
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
        size={60}
        sx={{
          color: 'primary.main',
          animationDuration: '550ms',
        }}
      />
    </Box>
  );
};

export default LoadingFallback;
