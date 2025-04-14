/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/pages/Login.tsx
import React, { useState } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
import { login } from 'services/api';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useMySnackbar } from 'contexts/MySnackbarProvider';
import { useLocalStorage } from 'hooks/useLocalStorage';

interface IFormInputs {
  username: string;
  password: string;
}

/**
 * Login component that handles user authentication.
 * It includes a form for username and password, and manages
 * the "remember me" functionality.
 *
 * @returns The rendered Login component.
 */
const Login = () => {
  const { login: loginIn } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const mySnackbar = useMySnackbar();
  const [valueInLocalStorage, setValueInLocalStorage] = useLocalStorage(
    `savedUsername`,
    ''
  );
  const [rememberMe, setRememberMe] = useState(!!valueInLocalStorage);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, clearErrors } = useForm({
    defaultValues: {
      username: rememberMe ? valueInLocalStorage : '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { from } = (location.state as { from?: { pathname: string } }) || {
    from: { pathname: '/' },
  };

  const onSubmit: SubmitHandler<IFormInputs> = async ({
    username,
    password,
  }) => {
    clearErrors();
    try {
      setIsLoading(true);
      const response = await login(username, password);

      if (rememberMe) {
        setValueInLocalStorage(username);
      } else {
        setValueInLocalStorage('');
      }
      // Actualizar contexto de autenticación
      loginIn(response.data);
      history.replace(from || '/');
    } catch (error: any) {
      mySnackbar.showWithMessage({ message: error.message, type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" color="primary.main" mb={3}>
          {t('login.title')}
        </Typography>

        <Box sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  label={t('login.username')}
                  fullWidth
                  autoComplete="username"
                  autoFocus
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label={t('login.password')}
                  type="password"
                  autoComplete="current-password"
                />
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label={t('login.rememberMe')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {t('login.loginButton')}
            </Button>
            <Grid container justifyContent="center">
              <Grid>
                <Typography variant="body2">
                  {t('login.dontHaveAccount')}{' '}
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    {t('login.register')}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
