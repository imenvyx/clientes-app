import React from 'react';
import { Box } from '@mui/material';

/**
 * A container component that wraps its children with a styled Box.
 * It provides padding and ensures the content takes the full width.
 *
 * @param props - The props object containing children.
 * @param props.children - The content to be rendered inside the container.
 * @returns  The rendered container component.
 */
export const OutletContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 10,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};
