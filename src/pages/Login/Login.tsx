// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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

interface IFormInputs {
  userName: string;
  password: string;
}

const Login = () => {
  const { login: loginIn } = useAuth();
  const history = useHistory();
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setValue('userName', savedUsername);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = async ({
    userName,
    password,
  }) => {
    clearErrors();
    try {
      const response = await login(userName, password);

      // Guardar token y datos de usuario
      localStorage.setItem('token', response.data.token);
      if (rememberMe) {
        localStorage.setItem('savedUsername', userName);
      } else {
        localStorage.removeItem('savedUsername');
      }

      // Actualizar contexto de autenticación
      loginIn(response.data);

      // Redirigir al home usando history.push
      history.push('/');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error?.message,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
              name="userName"
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

            {errors.root && (
              <Typography color="error" variant="body2" mt={2}>
                {errors.root.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
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
