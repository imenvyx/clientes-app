import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { OutletContainer } from 'components/OutletContainer';
import { useTranslation } from 'react-i18next';

/**
 * Home component that displays a welcome message and user information.
 *
 * @returns The rendered Home component.
 */
const Home = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <OutletContainer>
      <Toolbar />
      <Typography
        variant="h3"
        gutterBottom
        fontWeight={'bold'}
        sx={{ color: 'primary.main', mb: 4 }}
      >
        {t('home.welcome')}
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={'bold'}
        sx={{ color: 'primary.main', mb: 4 }}
      >
        {t('home.description')}
      </Typography>
    </OutletContainer>
  );
};

export default Home;
