import React, { useMemo } from 'react';
import { NotificationMessage } from 'components/types';
import { createContext, ReactNode, useContext } from 'react';

/** MySnackbarProviderProps */
export interface MySnackbarProviderProps {
  /** Set the notification message to display */
  setNotification: (notification: NotificationMessage) => void;

  /** Show or hide the MySnackbar component */
  show: (open: boolean) => void;

  /** Child component */
  children?: ReactNode;
}
/** MySnackbarContextProps */
export interface MySnackbarContextProps extends MySnackbarProviderProps {
  /** Show the snackbar with a given message. This is equivalent to: setNotification(notification); show(true); */
  showWithMessage: (notification: NotificationMessage) => void;
}

/** MySnackbarContext */
export const MySnackbarContext = createContext({} as MySnackbarContextProps);

/**
 * KatanaSnackbarProvider
 *
 * @param props Component props
 * @returns Component
 */
export const MySnackbarProvider: React.FC<MySnackbarProviderProps> = (
  props
) => {
  const showWithMessage = React.useCallback(
    (notification: NotificationMessage) => {
      props.setNotification(notification);
      props.show(true);
    },
    [props]
  );

  const values = useMemo(
    () => ({ ...props, showWithMessage }),
    [props, showWithMessage]
  );

  return (
    <MySnackbarContext.Provider value={values}>
      {props.children}
    </MySnackbarContext.Provider>
  );
};

/**
 * Provides access to the MySnackbarContext object
 *
 * @returns My Snackbar Provider context object properties
 */
export const useMySnackbar = (): MySnackbarContextProps => {
  const context = useContext(MySnackbarContext);
  if (!context) {
    throw new Error(
      'useMySnackbar debe usarse dentro de un MySnackbarProvider'
    );
  }
  return context;
};
