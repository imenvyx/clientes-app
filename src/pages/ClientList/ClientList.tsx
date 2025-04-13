// src/pages/ClientList.tsx
import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  Card,
  Divider,
  CardContent,
  CardHeader,
  Typography,
  Stack,
  Button,
  Grid,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Add,
  KeyboardBackspace,
} from '@mui/icons-material';

import { ClientCommon, ClientListPayload, PagedResults } from 'services/types';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryKeys } from 'lib/reactQuery/reactQueryKeys';
import { fetchClients } from 'services/api';
import { useMySnackbar } from 'contexts/MySnackbarProvider';
import { AxiosResponse } from 'axios';
import { OutletContainer } from 'components/OutletContainer';
import { useAuth } from 'contexts/AuthContext';

const ClientList = () => {
  const history = useHistory();
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [filteredClients, setFilteredClients] = useState<ClientCommon[]>([]);
  const mySnackbar = useMySnackbar();
  const { userData } = useAuth();

  const { data } = useQuery<AxiosResponse<ClientCommon[]>, Error>(
    [ReactQueryKeys.ClientList],
    () => {
      const userId = userData?.userid as string;
      const data: ClientListPayload = {
        nombre: '',
        identificacion: '',
        usuarioId: userId || '',
      };
      return fetchClients(data);
    },
    {
      onError: (error: Error) => {
        mySnackbar.showWithMessage({ message: error.message, type: 'error' });
      },
    }
  );

  console.log(data);

  // useEffect(() => {
  //   const filtered = data?.data.filter((client) => {
  //     const matchesName = client.nombre
  //       .toLowerCase()
  //       .includes(searchName.toLowerCase());
  //     const matchesId = client.identificacion.includes(searchId);
  //     return matchesName && matchesId;
  //   });
  //   setFilteredClients(filtered);
  // }, [searchName, searchId, clients]);

  const handleEdit = (clientId: string) => {
    history.push(`/clientes/editar/${clientId}`);
  };

  return (
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
          <Typography variant="h2">Consulta de clientes</Typography>
          <Stack direction={'row'} spacing={2}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={() => history.push('/clientes/crear')}
            >
              Agregar
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<KeyboardBackspace />}
              onClick={() => history.push('/')}
            >
              Regresar
            </Button>
          </Stack>
        </Box>
        <Divider />
        <Grid container sx={{ gap: 2, p: 3 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Identificación"
              variant="outlined"
              fullWidth
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
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
            >
              <Search sx={{ height: '30px', width: '30px' }} />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2, p: 3 }}
        >
          <Table>
            <TableHead sx={{ bgcolor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Identificación</TableCell>
                <TableCell sx={{ color: 'white' }}>Nombre completo</TableCell>
                <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.data?.map((client) => (
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
                      onClick={(f) => f /* onDelete(client.id) */}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>{''}</TableCell>
                <TableCell>{''} </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </OutletContainer>
  );
};

export default ClientList;
