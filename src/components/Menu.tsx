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
          MENÚ
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton href="/" sx={{}}>
          <ListItemIcon sx={{ color: 'primary.main' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="INICIO" />
        </ListItemButton>
        <ListItemButton href="/clientes">
          <ListItemIcon sx={{ color: 'primary.main' }}>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Consulta Clientes" />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        flexShrink: { sm: 0 },
        zIndex: 100,
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
