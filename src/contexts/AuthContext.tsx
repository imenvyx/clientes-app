import { useLocalStorage } from 'hooks/useLocalStorage';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
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
 * Provides authentication context to its children.
 *
 * @param props - The component props.
 * @param {ReactNode} props.children - The child components to wrap with the provider.
 * @returns The AuthContext provider with its children.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [localStorageData, setLocalStorageData] =
    useLocalStorage<UserData | null>('authData', null);

  const [loading, setLoading] = useState(true);

  // Verificar token al montar el componente
  useEffect(() => {
    const checkAuthValidity = () => {
      if (
        !(
          localStorageData?.token &&
          localStorageData?.expiration &&
          new Date(localStorageData.expiration) > new Date()
        )
      ) {
        setLocalStorageData(null);
      }
    };

    checkAuthValidity();
  }, [setLocalStorageData, localStorageData]);

  const login = useCallback(
    (data: UserData) => {
      setLocalStorageData(data);
      setLoading(false);
    },
    [setLocalStorageData]
  );

  const logout = useCallback(() => {
    setLocalStorageData(null);
  }, [setLocalStorageData]);

  // Memoiza el valor del contexto para evitar re-renders
  const contextValue = useMemo(
    () => ({
      userData: localStorageData,
      isAuthenticated: !!localStorageData?.token,
      login,
      logout,
      loading,
    }),
    [localStorageData, login, logout, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 * Throws an error if used outside of an AuthProvider.
 *
 * @returns {AuthContextType} The authentication context value.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
