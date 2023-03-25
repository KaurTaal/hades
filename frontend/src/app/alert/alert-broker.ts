import { Injectable } from '@angular/core';
import { Alert, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertBroker {

  private alerts: Alert[] = [];

  getAllAlerts(): Alert[] {
    return this.alerts;
  }

  add(content: string, type: AlertType, dismissAfterSeconds?: number): void {
    this.addAlert({
      type: type,
      icon: true,
      dismissible: true,
      content: content,
      dismissAfterSeconds: dismissAfterSeconds ?? AlertBroker.resolveDefaultTimeoutSeconds(type),
    });
  }

  dismiss(alert: Alert): void {
    const alertIndex = this.alerts.indexOf(alert);
    if (alertIndex > -1) {
      this.alerts.splice(alertIndex, 1);
    }
  }

  dismissAll(): void {
    this.alerts.length = 0;
  }

  private addAlert(alert: Alert): void {
    this.alerts.push(alert);
    if (alert.dismissAfterSeconds) {
      const fadeDurationSeconds = 1;
      let startFadeAfterSeconds = alert.dismissAfterSeconds - fadeDurationSeconds + 0.3;
      startFadeAfterSeconds = startFadeAfterSeconds < 0 ? 0 : startFadeAfterSeconds;
      setTimeout(() => alert.classes = ['fade-out-2'], startFadeAfterSeconds * 1000);
      setTimeout(() => this.dismiss(alert), alert.dismissAfterSeconds * 1000);
    }
  }

  private static resolveDefaultTimeoutSeconds(alertType: AlertType): number {
    switch (alertType) {
      case AlertType.PRIMARY:
      case AlertType.SUCCESS:
      case AlertType.DANGER:
      case AlertType.WARNING:
      case AlertType.INFO:
      case AlertType.LIGHT:
      case AlertType.DARK:
      case AlertType.SECONDARY:
      default:
        return 3;
    }
  }
}
