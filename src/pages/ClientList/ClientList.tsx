/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/pages/ClientList.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Typography,
  Stack,
  Button,
  Grid,
  TablePagination,
  Skeleton,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Add,
  KeyboardBackspace,
} from '@mui/icons-material';
import { ClientCommon, ClientListPayload } from 'services/types';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryKeys } from 'lib/reactQuery/reactQueryKeys';
import { fetchClients } from 'services/api';
import { useMySnackbar } from 'contexts/MySnackbarProvider';
import { AxiosResponse } from 'axios';
import { OutletContainer } from 'components/OutletContainer';
import { useAuth } from 'contexts/AuthContext';
import { DeleteModal, useMyModal } from 'components/DeleteModal';
import { useTranslation } from 'react-i18next';

/**
 * ClientList component renders a table of clients with search, pagination, and actions to edit or delete clients.
 * It also includes navigation buttons to add a new client or return to the home page.
 *
 * @returns The rendered ClientList component.
 */
const ClientList = () => {
  const history = useHistory();
  const mySnackbar = useMySnackbar();
  const { t } = useTranslation();
  const { userData } = useAuth();

  const [searchParams, setSearchParams] = useState({
    nombre: '',
    identificacion: '',
  });
  const [filters, setFilters] = useState({
    nombre: '',
    identificacion: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { clientId, open, closeModal, openModal, setClientId } = useMyModal();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const { data, isLoading, isFetching } = useQuery<
    AxiosResponse<ClientCommon[]>,
    Error
  >(
    [ReactQueryKeys.ClientList, filters],
    () => {
      const payload: ClientListPayload = {
        ...searchParams,
        usuarioId: userData?.userid || '',
      };
      return fetchClients(payload);
    },
    {
      enabled: !!userData,
      onError: (error: Error) => {
        mySnackbar.showWithMessage({ message: error.message, type: 'error' });
      },
    }
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (data?.data?.length ?? 0))
      : 0;

  const visibleRows = useMemo(() => {
    if (!data?.data) return [];
    return data.data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [data?.data, page, rowsPerPage]);

  const handleEdit = (clientId: string) => {
    history.push(`/clientes/editar/${clientId}`);
  };

  const handleSearchChange =
    (field: keyof typeof searchParams) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSearch = useCallback(() => {
    setFilters({ ...searchParams });
  }, [searchParams]);

  const isSearchDisabled = useMemo(() => {
    return (
      searchParams.nombre.trim() === '' &&
      searchParams.identificacion.trim() === ''
    );
  }, [searchParams.identificacion, searchParams.nombre]);

  return (
    <>
      <OutletContainer>
        <Paper elevation={3} sx={{ borderRadius: 2, height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '100%',
              p: 3,
            }}
          >
            <Typography variant="h2">{t('clientList.title')}</Typography>
            <Stack direction={'row'} spacing={2}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<Add />}
                onClick={() => history.push('/clientes/crear')}
              >
                {t('buttons.add')}
              </Button>
              <Button
                color="primary"
                variant="contained"
                startIcon={<KeyboardBackspace />}
                onClick={() => history.push('/')}
              >
                {t('clientList.back')}
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Grid container sx={{ gap: 2, p: 3 }}>
            <Grid item xs={12} sm={5}>
              <TextField
                label={t('clientList.clientName')}
                variant="outlined"
                fullWidth
                disabled={isFetching || isLoading}
                value={searchParams.nombre}
                onChange={handleSearchChange('nombre')}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label={t('clientList.clientIdentification')}
                variant="outlined"
                fullWidth
                disabled={isFetching || isLoading}
                value={searchParams.identificacion}
                onChange={handleSearchChange('identificacion')}
              />
            </Grid>
            <Grid item xs={12} sm={1} sx={{ alignItems: 'center' }}>
              <IconButton
                color="primary"
                sx={{
                  height: '50px',
                  width: '50px',
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
                onClick={handleSearch}
                disabled={isFetching || isSearchDisabled}
              >
                <Search sx={{ height: '30px', width: '30px' }} />
              </IconButton>
            </Grid>
          </Grid>

          <Divider />

          <TableContainer sx={{ p: 3 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'small'}
            >
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>
                    {t('clientList.clientIdentification')}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {t('clientList.fullName')}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {t('clientList.actions')}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading || isFetching
                  ? Array.from({ length: rowsPerPage }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                        <TableCell>
                          <Stack direction={'row'} spacing={2}>
                            <Skeleton
                              variant="rectangular"
                              width={40}
                              height={40}
                            />
                            <Skeleton
                              variant="rectangular"
                              width={40}
                              height={40}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  : visibleRows.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.identificacion}</TableCell>
                        <TableCell>{`${client.nombre} ${client.apellidos}`}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(client.id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setClientId(client.id);
                              openModal();
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.data?.length ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </OutletContainer>
      <DeleteModal open={open} closeModal={closeModal} clientId={clientId} />
    </>
  );
};

export default ClientList;
