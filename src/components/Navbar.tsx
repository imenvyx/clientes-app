import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';

export const Navbar = () => {
  const { userData } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={
            {
              /* flexGrow: 1 */
            }
          }
        >
          COMPAÑIA PRUEBA
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {userData?.username?.[0].toUpperCase()}
          </Avatar>
          <Typography variant="body1">{userData?.username}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
