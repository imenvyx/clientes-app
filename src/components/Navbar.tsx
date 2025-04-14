import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from 'contexts/AuthContext';

import { useDrawer } from 'contexts/DrawerProvider';

/**
 * Navbar component that displays the application header with a menu toggle,
 * user information, and a logout button.
 *
 * @returns  The rendered Navbar component.
 */
export const Navbar = () => {
  const { userData } = useAuth();

  const { handleOpen } = useDrawer();

  const { logout } = useAuth();

  const handleLogout = () => {
    // Implement logout functionality here
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        zIndex: 200,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Cliente Dashboard
        </Typography>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="body1">{userData?.username}</Typography>
          <IconButton
            color="secondary"
            aria-label="add to shopping cart"
            size="large"
            onClick={handleLogout}
          >
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
