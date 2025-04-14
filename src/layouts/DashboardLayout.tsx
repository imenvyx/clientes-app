// src/components/DashboardLayout.tsx
import React from 'react';
import { Box } from '@mui/material';
import { Navbar } from 'components/Navbar';
import { Menu } from 'components/Menu';

const drawerWidth = 240;

/**
 * DashboardLayout is a layout component that provides a navigation bar,
 * a menu, and a main content area for the application.
 *
 * @param {React.ReactNode} children - The content to be displayed in the main area.
 * @returns The rendered layout component.
 */
const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Menu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
