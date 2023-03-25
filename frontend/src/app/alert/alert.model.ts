export interface Alert {
  type: AlertType;
  icon: boolean;
  dismissible: boolean;
  content: string;
  dismissAfterSeconds?: number;
  classes?: string[]
}

export enum AlertType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
}
