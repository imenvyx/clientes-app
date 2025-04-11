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
// import Home from '../pages/Home';
// import ClientList from '../pages/ClientList';
// import ClientForm from '../pages/ClientForm';
// import Error404 from '../pages/Error404';

// Componente para rutas privadas
const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { userData } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData?.userId ? (
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
const RouterConfig: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* Rutas públicas */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* Rutas privadas */}
        <PrivateRoute exact path="/">
          {/* <Home>
            <ClientList />
          </Home> */}
        </PrivateRoute>

        <PrivateRoute exact path="/clientes">
          {/* <Home>
            <ClientList />
          </Home> */}
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
