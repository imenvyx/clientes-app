import { Box, Toolbar, Typography } from '@mui/material';
import { useAuth } from 'contexts/AuthContext';

export const Home = () => {
  const { userData } = useAuth();
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        width: '100%',
      }}
    >
      <Toolbar />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: 'primary.main', mb: 4 }}
      >
        Bienvenido {userData?.username}
      </Typography>
    </Box>
  );
};
