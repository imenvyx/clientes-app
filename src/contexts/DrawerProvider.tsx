import { useLocalStorage } from 'hooks/useLocalStorage';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useState,
  createContext,
} from 'react';

type DrawerContextType = {
  open: boolean;
  handleOpen: () => void;
};

const DrawerContext = createContext<DrawerContextType>({} as DrawerContextType);

/**
 * Provides a context for managing the state of a drawer component.
 *
 * @param {object} props - The props for the provider.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns  The provider component wrapping its children.
 */
export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [valueInLocalStorage, setValueInLocalStorage] = useLocalStorage(
    'drawerStatus',
    true
  );
  const [open, setOpen] = useState(() => valueInLocalStorage ?? true);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    setValueInLocalStorage(!open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const value = {
    open,
    handleOpen,
  };

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

/**
 * Custom hook to access the DrawerContext.
 * Throws an error if used outside of a DrawerProvider.
 *
 * @returns  The context value for the drawer.
 */
export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer debe usarse dentro de un DrawerContext');
  }
  return context;
};
