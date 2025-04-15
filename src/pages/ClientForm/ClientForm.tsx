import React, { useEffect, useMemo } from 'react';
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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { OutletContainer } from 'components/OutletContainer';
import dayjs from 'dayjs';
import { KeyboardBackspace, Save } from '@mui/icons-material';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  Client,
  AddClientFormData,
  Interest,
  UpdateClientFormData,
} from 'services/types';
import {
  clientInfo,
  createClient,
  fetchInterests,
  updateClient,
} from 'services/api';
import { useMySnackbar } from 'contexts/MySnackbarProvider';
import { ReactQueryKeys } from 'lib/reactQuery/reactQueryKeys';
import { useAuth } from 'contexts/AuthContext';
import { Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

/**
 * ClientForm component is used for creating or editing client information.
 * It fetches client data if an ID is provided and allows form submission for saving the data.
 *
 * @returns  The rendered ClientForm component.
 */
const ClientForm = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const history = useHistory();
  const mySnackbar = useMySnackbar();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const theme = useTheme();
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

  const { data, isSuccess } = useQuery<AxiosResponse<Client>, Error>(
    [ReactQueryKeys.Client, id],
    () => {
      return clientInfo(id);
    },
    {
      enabled: !!id,
      onError: (error: Error) => {
        mySnackbar.showWithMessage({ message: error.message, type: 'error' });
      },
    }
  );

  const initialValues = useMemo(() => {
    return isSuccess
      ? {
          identificacion: data?.data?.identificacion,
          nombre: data?.data?.nombre,
          apellidos: data?.data?.apellidos,
          celular: data?.data?.telefonoCelular,
          otroTelefono: data?.data?.otroTelefono,
          direccion: data?.data?.direccion,
          fNacimiento: data?.data?.fNacimiento,
          fAfiliacion: data?.data?.fAfiliacion,
          sexo: data?.data?.sexo,
          resennaPersonal: data?.data?.resenaPersonal,
          imagen: data?.data?.imagen,
          interesFK: data?.data?.interesesId,
        }
      : {
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
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<AddClientFormData>({
    defaultValues: initialValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      Object.entries(initialValues).forEach(([key, value]) => {
        setValue(key as keyof AddClientFormData, value);
      });
    }
  }, [isSuccess, data, initialValues, setValue]);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        mySnackbar.showWithMessage({
          message: t('error.onlyPhoto'),
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

  const mutation = useMutation({
    mutationFn: (clientData: AddClientFormData | UpdateClientFormData) => {
      return id
        ? updateClient(clientData as UpdateClientFormData)
        : createClient(clientData as AddClientFormData);
    },
    onSuccess: async () => {
      mySnackbar.showWithMessage({
        message: id
          ? t('clientForm.updatedSuccesfull')
          : t('clientForm.addedSuccesfull'),
        type: 'success',
      });
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === ReactQueryKeys.ClientList ||
          (query.queryKey[0] === ReactQueryKeys.Client &&
            query.queryKey[1] === id),
      });
      history.push('/clientes');
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : t('common.commonerror');
      mySnackbar.showWithMessage({
        message: errorMessage,
        type: 'error',
      });
    },
  });

  const onSubmit: SubmitHandler<AddClientFormData> = (
    data: AddClientFormData
  ) => {
    clearErrors();
    const usuarioId = userData?.userid as string;
    const payload = id ? { ...data, id, usuarioId } : { ...data, usuarioId };

    mutation.mutate(payload);
  };

  return (
    <OutletContainer>
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(onSubmit)();
        }}
        sx={{ mt: 3, minWidth: 500 }}
      >
        <Stack
          direction={
            useMediaQuery(theme.breakpoints.down('sm')) ? 'column' : 'row'
          }
          spacing={useMediaQuery(theme.breakpoints.down('sm')) ? 2 : 0}
          sx={{
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
                  />
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
                        color: 'white',
                        bgcolor: 'info.main',
                        '&:hover': { bgcolor: 'info.main' },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </label>
                </Box>
              )}
            />
            <Typography variant="h5" fontWeight={'bold'}>
              {t('clientForm.title')}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2} height={'100%'}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Save />}
              type="submit"
              size="small"
              disabled={mutation.isLoading}
            >
              {t('buttons.save')}
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<KeyboardBackspace />}
              onClick={() => history.push('/')}
              disabled={mutation.isLoading}
            >
              {t('buttons.back')}
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="identificacion"
              control={control}
              rules={{
                required: `${t('common.validation.required')}`,
                pattern: {
                  value: /^[0-9]+$/,
                  message: t('clientForm.validation.identificacionDigitsOnly'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('clientForm.clientIdentification')}
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
              rules={{
                required: `${t('common.validation.required')}`,

                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                  message: t('clientForm.validation.onlyLetters'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('clientForm.name')}
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
              rules={{
                required: `${t('common.validation.required')}`,
                pattern: {
                  value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                  message: t('clientForm.validation.onlyLetters'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('clientForm.lastName')}
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
              <InputLabel>{t('clientForm.gender.title')}</InputLabel>
              <Controller
                name="sexo"
                control={control}
                rules={{ required: `${t('common.validation.required')}` }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label={t('clientForm.gender.title')}
                    error={!!errors.sexo}
                    SelectDisplayProps={{
                      'aria-labelledby': 'basic-button',
                      role: 'listbox',
                    }}
                  >
                    <MenuItem value="F">
                      {t('clientForm.gender.female')}
                    </MenuItem>
                    <MenuItem value="M">{t('clientForm.gender.male')}</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controller
              name="fNacimiento"
              control={control}
              rules={{ required: `${t('common.validation.required')}` }}
              render={({ field }) => (
                <DatePicker
                  sx={{ width: '100%' }}
                  label={t('clientForm.birthDate')}
                  disableFuture
                  minDate={dayjs('1900-01-01')}
                  views={['year', 'month', 'day']}
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
              rules={{ required: `${t('common.validation.required')}` }}
              render={({ field }) => (
                <DatePicker
                  sx={{ width: '100%' }}
                  label={t('clientForm.afilationDate')}
                  disableFuture
                  minDate={dayjs('1900-01-01')}
                  views={['year', 'month', 'day']}
                  value={field.value ? dayjs(field.value) : null}
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
              rules={{
                required: `${t('common.validation.required')}`,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: t('clientForm.validation.phone10Digits'),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('clientForm.cellPhone')}
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
              rules={{
                required: `${t('common.validation.required')}`,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: t('clientForm.validation.phone10Digits'),
                },
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('clientForm.otherPhone')}
                  fullWidth
                  error={!!errors.celular}
                  helperText={errors.celular?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>{t('clientForm.interest')}</InputLabel>
              <Controller
                name="interesFK"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label={t('clientForm.interest')}
                    error={!!errors.interesFK}
                  >
                    {interests.isLoading ? (
                      <MenuItem disabled>{t('common.loadingText')}</MenuItem>
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
              rules={{ required: `${t('common.validation.required')}` }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('clientForm.address')}
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
                  label={t('clientForm.summary')}
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
