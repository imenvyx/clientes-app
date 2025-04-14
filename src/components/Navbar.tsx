import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from 'contexts/AuthContext';
import LanguageIcon from '@mui/icons-material/Language';
import { useDrawer } from 'contexts/DrawerProvider';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '@emotion/react';

/**
 * Navbar component that displays the application header with a menu toggle,
 * user information, and a logout button.
 *
 * @returns  The rendered Navbar component.
 */
export const Navbar = () => {
  const { userData } = useAuth();
  const { i18n } = useTranslation();
  const theme = useTheme();
  const { handleOpen } = useDrawer();

  const { logout } = useAuth();

  const toggleLanguage = async () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    await i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        zIndex: theme.zIndex.appBar,
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
          <IconButton
            color="inherit"
            aria-label="toggle language"
            onClick={() => void toggleLanguage()}
          >
            <LanguageIcon />
          </IconButton>
          <Typography variant="body1">{userData?.username}</Typography>
          <IconButton
            color="inherit"
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
