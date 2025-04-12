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
} from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';
import { ClientCommon, PagedResults } from 'services/types';
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

  const clients = useQuery<AxiosResponse<ClientCommon[]>, Error>(
    [ReactQueryKeys.ClientList],
    () => {
      return fetchClients(userData?.userid as string);
    },
    {
      onError: (error: Error) => {
        mySnackbar.showWithMessage({ message: error.message, type: 'error' });
      },
    }
  );

  console.log(clients);

  // useEffect(() => {
  //   const filtered = clients.filter((client) => {
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
            mb: 3,
          }}
        >
          <Typography variant="h2">Consulta de clientes</Typography>

          <IconButton
            color="primary"
            onClick={() => history.push('/clientes/crear')}
          >
            <Edit />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <TextField
            label="Identificación"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </Box>
        <Divider sx={{ mb: 3 }} />

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}
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
              {filteredClients.map((client) => (
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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </OutletContainer>
  );
};

export default ClientList;
