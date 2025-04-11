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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos de autenticación al iniciar
  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as UserData;
        setUserData(parsedData);
      } catch (error) {
        throw new Error('Error parsing auth data:');
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (data: UserData) => {
    // Guardar en localStorage
    localStorage.setItem('authData', JSON.stringify(data));
    setUserData(data);
  };

  const logout = () => {
    // Limpiar almacenamiento local y estado
    localStorage.removeItem('authData');
    setUserData(null);
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
