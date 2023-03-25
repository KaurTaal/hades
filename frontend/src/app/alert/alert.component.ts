import { Component } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faCheck,
  faExclamation,
  faFaceFrownOpen,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faEye, faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { AlertBroker } from './alert-broker';

@Component({
  selector: 'hades-alert',
  templateUrl: './alert.component.html',
  styleUrls: [ './alert.component.scss' ],
})
export class AlertComponent {

  constructor(public alertBroker: AlertBroker) {
  }

  resolveIcon(type: AlertType): IconDefinition {
    switch (type) {
      case AlertType.PRIMARY:
        return faBell;
      case AlertType.SUCCESS:
        return faCheck;
      case AlertType.DANGER:
        return faTriangleExclamation;
      case AlertType.WARNING:
        return faExclamation;
      case AlertType.INFO:
        return faLightbulb;
      case AlertType.LIGHT:
        return faEye;
      case AlertType.DARK:
      case AlertType.SECONDARY:
        return faBookmark;
      default:
        return faFaceFrownOpen;
    }
  }

  getClasses(alert: Alert): string[] {
    return [ `alert-${ alert.type }`, ...(alert.classes ?? []) ];
  }

  showDismissAll(): boolean {
    return this.alertBroker.getAllAlerts().length > 1
  }
}
