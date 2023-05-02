import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {AlertBroker} from "../app/alert/alert-broker";
import {AlertType} from "../app/alert/alert.model";
import {ErrorMessage} from "../app/public/classes/enums/ErrorMessage";
import {SharedDataService} from "../app/public/services/shared-data.service";


@Injectable()
export class HttpMiddleware implements HttpInterceptor {

  constructor(private alertBroker: AlertBroker, private sharedDataService: SharedDataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((error) => {
        this.alertBroker.add("Serveri sisene viga!", AlertType.DANGER);
        return throwError(() => error);
      }))
      .pipe(tap((response) => {
        if (response instanceof HttpResponse) {
          if (response?.body?.responseType === 'ui-exception') {
            this.sharedDataService.setIsNotActiveUser(this.isNotActivatedUserError(response.body.message));
            this.sharedDataService.setIsNotRegisteredUser(this.isNotRegisteredUserError(response.body.message));
            // @ts-ignore
            this.alertBroker.add(response.body.message, AlertType[response.body.type]);
            throw new Error("Interceptor consumed error");
          }
        }
      }))
  }

  private isNotRegisteredUserError(message: string): boolean {
    return message === ErrorMessage.HADES_USER_NOT_FOUND;
  }

  private isNotActivatedUserError(message: string): boolean {
    return message === ErrorMessage.HADES_USER_NOT_ACTIVATED;
  }

}
