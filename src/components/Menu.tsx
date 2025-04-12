import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';

export const Menu = () => {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userData } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <ListItemButton href="/">
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
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        zIndex: 100,
      }}
    >
      <Drawer
        variant="permanent"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            bgcolor: (theme) => theme.palette.background.default,
            pt: 10,
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
