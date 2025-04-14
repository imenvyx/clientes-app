import { useLocalStorage } from 'hooks/useLocalStorage';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

type UserData = {
  username: string;
  userid: string;
  token: string;
  expiration: string;
};

type AuthContextType = {
  userData: UserData | null;
  isAuthenticated: boolean;
  login: (data: UserData) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

/**
 * AuthProvider is a context provider that manages authentication state,
 * including user data, login, logout, and loading state.
 *
 * @param {object} props - The props for the AuthProvider component.
 * @param {ReactNode} props.children - The child components to render within the provider.
 * @returns  The rendered AuthProvider component.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [valueInLocalStorage, setValueInLocalStorage] = useLocalStorage(
    'authData',
    {}
  );
  const [userData, setUserData] = useState<UserData | null>(
    () => valueInLocalStorage as UserData
  );
  const [loading, setLoading] = useState(true);

  const login = React.useCallback(
    (data: UserData) => {
      // Guardar en localStorage
      setValueInLocalStorage(data);
      setUserData(data);
    },
    [setValueInLocalStorage]
  );

  const logout = React.useCallback(() => {
    // Limpiar almacenamiento local y estado
    setValueInLocalStorage({});
    setUserData(null);
  }, [setValueInLocalStorage]);

  // Cargar datos de autenticación al iniciar
  useEffect(() => {
    if (!userData) {
      logout();
    }
    setLoading(false);
  }, [logout, userData]);

  const value = {
    userData,
    isAuthenticated: !!userData?.token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 * Throws an error if used outside of an AuthProvider.
 *
 * @returns The authentication context value.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
