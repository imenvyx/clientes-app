// src/pages/Register.tsx
import React from 'react';
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

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

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

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    clearErrors();
    try {
      await registerUser(data.username, data.email, data.password);

      history.push('/login');
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error?.message,
      });
    }
  };

  const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (value.length < 9 || value.length > 20) {
      return 'La contraseña debe tener entre 9 y 20 caracteres';
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return 'Debe contener al menos una mayúscula, una minúscula y un número';
    }
    return true;
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
          REGISTRO
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%' }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Nombre Usuario *"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username', {
              required: 'Este campo es requerido',
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
              required: 'Este campo es requerido',
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
              required: 'Este campo es requerido',
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
          >
            REGISTRARME
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
