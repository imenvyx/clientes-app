export type NotificationMessageType =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'update';

export type NotificationMessage = {
  type: NotificationMessageType;

  message: string;

  longMessage?: string;
};
