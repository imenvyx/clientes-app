import React, { Suspense, useState } from 'react';
import './App.css';
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import clientsTheme from 'components/Theme';
import { QueryClientConfig } from 'lib/reactQuery/queryClientConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'contexts/AuthContext';
import RouterConfig from 'routes/RouterConfig';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { MySnackbar } from 'components/Snackbar';
import { NotificationMessage } from 'components/types';
import { MySnackbarProvider } from 'contexts/MySnackbarProvider';

/**
 * The `Clientes` component is a functional React component that renders
 * a simple user interface with a header, an image, a paragraph, and a link.
 *
 * @returns A React element representing the `Clientes` component.
 */
const Clients = () => {
  const queryClient = new QueryClient(QueryClientConfig);

  const [appSnackbarOpen, setAppSnackbarOpen] = useState(false);
  const [appSnackbar, setAppSnackbar] = useState<NotificationMessage>({
    message: '',
    type: 'info',
  });

  return (
    <div className="App">
      <Suspense fallback={<CircularProgress size={15} />}>
        <CssBaseline />
        <MySnackbar
          open={appSnackbarOpen}
          notification={appSnackbar}
          onClose={() => setAppSnackbarOpen(false)}
        />
        <ThemeProvider theme={clientsTheme}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <I18nextProvider i18n={i18n}>
                <MySnackbarProvider
                  setNotification={setAppSnackbar}
                  show={setAppSnackbarOpen}
                >
                  <RouterConfig></RouterConfig>
                </MySnackbarProvider>
              </I18nextProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </Suspense>
    </div>
  );
};

export default Clients;
