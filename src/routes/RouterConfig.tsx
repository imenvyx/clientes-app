import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingFallback from 'components/LoadingFallback';
import DashboardLayout from 'layouts/DashboardLayout';

// Lazy load de componentes
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const Home = lazy(() => import('pages/Home/Home'));
const ClientList = lazy(() => import('pages/ClientList/ClientList'));
const ClientForm = lazy(() => import('pages/ClientForm/ClientForm'));
const Error404 = lazy(() => import('pages/Errors/Error404'));

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
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

const RouterConfig: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/* Rutas públicas */}
        <Route
          exact
          path="/login"
          render={() => (
            <Suspense fallback={<LoadingFallback />}>
              <Login />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <Suspense fallback={<LoadingFallback />}>
              <Register />
            </Suspense>
          )}
        />

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

        <PrivateRoute exact path="/clientes/crear">
          <DashboardLayout>
            <ClientForm />
          </DashboardLayout>
        </PrivateRoute>

        <PrivateRoute exact path="/clientes/editar/:id">
          <DashboardLayout>
            <ClientForm />
          </DashboardLayout>
        </PrivateRoute>

        {/* Ruta 404 */}
        <Route
          path="*"
          render={() => (
            <DashboardLayout>
              <Suspense fallback={<LoadingFallback />}>
                <Error404 />
              </Suspense>
            </DashboardLayout>
          )}
        />
      </Switch>
    </Router>
  );
};

export default RouterConfig;
