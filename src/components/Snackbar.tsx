/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from 'react';
import {
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Theme,
  useTheme,
} from '@mui/material';
import { NotificationMessage } from './types';
import useClasses from 'hooks/useClasses';

import clsx from 'clsx';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { truncate } from 'lodash';

const useStyles = (theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.light,
  },
  info: {
    color: theme.palette.info.light,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
});

/** SnackbarProps */
export interface SnackbarProps {
  /** If true, the snackbar is displayed */
  open: boolean;

  /** Called when closing the snackbar */
  onClose: () => void;

  /** Message and type to display */
  notification: NotificationMessage;

  /**
   * Truncate
   *  If length is -1, truncate is disabled. Otherwise,
   *  messages are truncated.
   */
  truncate?: { length: number };
}

/**
 * Custom Snackbar component with support for NotificationMessage type
 *
 * @param props Component props
 * @returns Component
 */
export const MySnackbar = (props: SnackbarProps) => {
  const theme = useTheme();
  const classes = useClasses(useStyles(theme));

  const { open, onClose, notification } = props;

  const handleClose = (
    _: Event | React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    onClose();
  };

  const getIcon = useCallback(
    (type: NotificationMessage['type']) => {
      const iconProps = { className: clsx(classes.icon, classes[type]) };
      switch (type) {
        case 'success':
          return <CheckCircleIcon {...iconProps} />;
        case 'error':
          return <ErrorIcon {...iconProps} />;
        case 'warning':
          return <WarningIcon {...iconProps} />;
        case 'info':
        default:
          return <InfoIcon {...iconProps} />;
      }
    },
    [classes]
  );

  const shouldTruncate =
    props.truncate?.length !== -1 &&
    notification?.message?.length > (props.truncate?.length ?? 180);

  return (
    <Snackbar
      open={open}
      autoHideDuration={notification.type === 'error' ? null : 10000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        <span id="message-id" style={{ display: 'flex', alignItems: 'center' }}>
          {getIcon(notification.type)}{' '}
          {/* Use the icon based on notification type */}
          {shouldTruncate
            ? truncate(notification.message, {
                length: props.truncate?.length ?? 180,
              })
            : notification.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};
