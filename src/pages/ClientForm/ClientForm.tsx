/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Stack,
  Divider,
  Avatar,
  Paper,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { OutletContainer } from 'components/OutletContainer';
import dayjs from 'dayjs';
import { KeyboardBackspace, Save } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ClientFormData, Interest } from 'services/types';
import { createClient, fetchInterests } from 'services/api';
import { useMySnackbar } from 'contexts/MySnackbarProvider';
import { ReactQueryKeys } from 'lib/reactQuery/reactQueryKeys';
import { useAuth } from 'contexts/AuthContext';
import { Edit } from '@mui/icons-material';

const ClientForm = ({ initialValues }: { initialValues?: ClientFormData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ClientFormData>({
    defaultValues:
      typeof initialValues === 'undefined'
        ? {
            identificacion: '',
            nombre: '',
            apellidos: '',
            celular: '',
            otroTelefono: '',
            direccion: '',
            fNacimiento: '',
            fAfiliacion: '',
            sexo: '',
            resennaPersonal: '',
            imagen: '',
            interesFK: '',
            usuarioId: '',
          }
        : initialValues,
    mode: 'onChange',
  });
  const history = useHistory();
  const mySnackbar = useMySnackbar();
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const interests = useQuery<AxiosResponse<Interest[]>, Error>(
    [ReactQueryKeys.InterestList],
    () => {
      return fetchInterests();
    },
    {
      onError: (error: Error) => {
        mySnackbar.showWithMessage({ message: error.message, type: 'error' });
      },
    }
  );

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        mySnackbar.showWithMessage({
          message: 'Solo se permiten archivos de imagen',
          type: 'error',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<ClientFormData> = async (
    data: ClientFormData
  ) => {
    const usuarioId = userData?.userid as string;
    try {
      const payload = {
        ...data,
        usuarioId,
      };
      const response = await createClient(payload);
      if (response.status === 200) {
        clearErrors();
        mySnackbar.showWithMessage({
          message: 'Cliente ha sido creado exitosamente',
          type: 'success',
        });
        await queryClient.invalidateQueries([ReactQueryKeys.ClientList]);
        history.push('/clientes');
      }
    } catch (error: any) {
      mySnackbar.showWithMessage({
        message: error?.message as string,
        type: 'error',
      });
    }
  };

  return (
    <OutletContainer>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Controller
              name="imagen"
              control={control}
              render={({ field }) => (
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      cursor: 'pointer',
                      bgcolor: 'primary.main',
                    }}
                    src={field.value}
                  ></Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="avatar-upload"
                    onChange={(e) => handleImageUpload(e, field.onChange)}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </label>
                </Box>
              )}
            />
            <Typography variant="h5" fontWeight={'bold'}>
              Mantenimiento de clientes
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2} height={'100%'}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Save />}
              type="submit"
              size="small"
            >
              Guardar
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<KeyboardBackspace />}
              onClick={() => history.push('/')}
            >
              Regresar
            </Button>
          </Stack>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="identificacion"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Identificación *"
                  fullWidth
                  error={!!errors.identificacion}
                  helperText={errors.identificacion?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="nombre"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre *"
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="apellidos"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellidos *"
                  fullWidth
                  error={!!errors.apellidos}
                  helperText={errors.apellidos?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              sx={{ justifyContent: 'flex-start', display: 'flex' }}
            >
              <InputLabel>Género *</InputLabel>
              <Controller
                name="sexo"
                control={control}
                rules={{ required: 'Campo obligatorio' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Género *"
                    error={!!errors.sexo}
                    SelectDisplayProps={{
                      'aria-labelledby': 'basic-button',
                      role: 'listbox',
                    }}
                  >
                    <MenuItem value="F">Femenino</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="fNacimiento"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <DatePicker
                  sx={{ width: '100%' }}
                  label="Fecha de nacimiento *"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="fAfiliacion"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <DatePicker
                  sx={{ width: '100%' }}
                  label="Fecha de afiliación *"
                  value={
                    typeof field.value === 'string' ? dayjs(field.value) : null
                  }
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
          </Grid>

          {/* Teléfonos */}
          <Grid item xs={12} sm={4}>
            <Controller
              name="celular"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Teléfono Celular *"
                  fullWidth
                  error={!!errors.celular}
                  helperText={errors.celular?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="otroTelefono"
              rules={{ required: 'Campo obligatorio' }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Teléfono Otro"
                  fullWidth
                  error={!!errors.celular}
                  helperText={errors.celular?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Interés *</InputLabel>
              <Controller
                name="interesFK"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Interés *"
                    error={!!errors.interesFK}
                  >
                    {interests.isLoading ? (
                      <MenuItem disabled>Cargando intereses...</MenuItem>
                    ) : (
                      interests?.data?.data?.map((interest: Interest) => (
                        <MenuItem key={interest.id} value={interest.id}>
                          {interest.descripcion}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="direccion"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dirección"
                  fullWidth
                  error={!!errors.direccion}
                  helperText={errors.direccion?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="resennaPersonal"
              control={control}
              rules={{ required: 'Campo obligatorio' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Reseña Personal"
                  fullWidth
                  error={!!errors.resennaPersonal}
                  helperText={errors.resennaPersonal?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>
    </OutletContainer>
  );
};

export default ClientForm;
