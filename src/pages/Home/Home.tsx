import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { OutletContainer } from 'components/OutletContainer';
import { useAuth } from 'contexts/AuthContext';

/**
 * Home component that displays a welcome message and user information.
 *
 * @returns The rendered Home component.
 */
export const Home = (): JSX.Element => {
  const { userData } = useAuth();
  return (
    <OutletContainer>
      <Toolbar />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: 'primary.main', mb: 4 }}
      >
        Bienvenido {userData?.username}
      </Typography>
    </OutletContainer>
  );
};
