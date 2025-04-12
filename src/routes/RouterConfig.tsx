// src/routes/RouterConfig.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import DashboardLayout from 'layouts/DashboardLayout';
import { Home } from 'pages/Home/Home';
import ClientList from 'pages/ClientList/ClientList';
// import ClientForm from '../pages/ClientForm';
// import Error404 from '../pages/Error404';

// Componente para rutas privadas
const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

/**
 * RouterConfig is the main routing component of the application.
 * It defines public and private routes and handles redirection for unauthorized access.
 *
 * @returns  The routing configuration for the application.
 */
const RouterConfig = () => {
  return (
    <Router>
      <Switch>
        {/* Rutas públicas */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* Rutas privadas */}
        <PrivateRoute exact path="/">
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        </PrivateRoute>

        <PrivateRoute exact path="/clientes">
          <DashboardLayout>
            <ClientList />
          </DashboardLayout>
        </PrivateRoute>

        <PrivateRoute exact path="/clientes/nuevo">
          {/*  <Home>
            <ClientForm />
          </Home> */}
        </PrivateRoute>

        <PrivateRoute exact path="/clientes/editar/:id">
          {/*  <Home>
            <ClientForm />
          </Home> */}
        </PrivateRoute>

        {/* Ruta de error 404 */}
        <Route path="*">{/*   <Error404 /> */}</Route>
      </Switch>
    </Router>
  );
};

export default RouterConfig;
