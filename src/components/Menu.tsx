import React from 'react';
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useAuth } from 'contexts/AuthContext';
import { useDrawer } from 'contexts/DrawerProvider';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Menu component that renders a navigation drawer with user information and navigation links.
 *
 * @returns The rendered Menu component.
 */
export const Menu = () => {
  const drawerWidth = 240;
  const { open } = useDrawer();
  const { userData } = useAuth();
  const theme = useTheme();
  const { t } = useTranslation();

  const drawer = (
    <>
      <Stack
        direction={'column'}
        sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}
      >
        <Avatar sx={{ width: 90, height: 90 }}>
          {userData?.username?.[0].toUpperCase()}
        </Avatar>
        <Typography variant="body1">{userData?.username}</Typography>
      </Stack>
      <Divider />
      <Toolbar
        sx={{
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" fontWeight={'bold'}>
          {t('menu.title')}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'primary.main' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('menu.home')} />
          </ListItemButton>
        </Link>
        <Link to="/clientes" style={{ textDecoration: 'none' }}>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'primary.main' }}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary={t('menu.clients')} />
          </ListItemButton>
        </Link>
      </List>
    </>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        flexShrink: { sm: 0 },
        zIndex: theme.zIndex.drawer,
        width: open ? drawerWidth : 0,
        [`& .MuiDrawer-paper`]: {
          bgcolor: (theme) => theme.palette.background.default,
          flexShrink: { sm: 0 },
          pt: 10,
          boxSizing: 'border-box',
          width: open ? drawerWidth : 0,
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};
