import React, { Suspense } from 'react';
import './App.css';
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import clientsTheme from 'components/Theme';
import { QueryClientConfig } from 'lib/reactQuery/queryClientConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from 'contexts/AuthContext';
import RouterConfig from 'routes/RouterConfig';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

/**
 * The `Clientes` component is a functional React component that renders
 * a simple user interface with a header, an image, a paragraph, and a link.
 *
 * @returns A React element representing the `Clientes` component.
 */
const Clients = () => {
  const queryClient = new QueryClient(QueryClientConfig);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={clientsTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <I18nextProvider i18n={i18n}>
              <Suspense fallback={<CircularProgress size={15} />}>
                <RouterConfig>
                  <div className="App"></div>
                </RouterConfig>
              </Suspense>
            </I18nextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default Clients;
