/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/pages/Register.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
} from '@mui/material';
import { register as registerUser } from 'services/api';
import { t } from 'i18next';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

/**
 * Register component renders a registration form for new users.
 * It handles form submission and validation.˝
 *
 * @returns  The rendered registration form component.
 */
const Register = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<RegisterForm>({
    mode: 'onBlur',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    clearErrors();
    try {
      setIsLoading(true);
      await registerUser(data.username, data.email, data.password);

      history.push('/login');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error?.message,
      });
      setIsLoading(false);
    }
  };

  const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (value.length < 9 || value.length > 20) {
      return t('register.validatePassword.length');
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return t('register.validatePassword.upperCase');
    }
    return true;
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
          {t('register.title')}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%' }}
        >
          <TextField
            fullWidth
            margin="normal"
            label={t('register.username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username', {
              required: `${t('common.validation.required')}`,
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
            })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Dirección de correo *"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: `${t('common.validation.required')}`,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Contraseña *"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: `${t('common.validation.required')}`,
              validate: validatePassword,
            })}
          />

          {errors.root && (
            <Typography
              color="error"
              variant="body2"
              mt={2}
              textAlign={'center'}
            >
              {errors.root.message}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {t('register.registerButton')}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                {t('register.question')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
