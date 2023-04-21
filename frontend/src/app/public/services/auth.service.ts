import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserI} from "../../model/user.interface";
import {delay, Observable, of, Subscription, tap} from "rxjs";
import {LoginResponseI} from "../../model/login-response.interface";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {RoleType} from "../../protected/classes/enums/RoleType";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenSubscription = new Subscription();
  timeout: number = -1;

  constructor(private http: HttpClient, private jwtService: JwtHelperService, private router: Router) { }


  login(user: UserI): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>(`api/auth/authenticate`, user).pipe(
      tap((res) => {
        let tokenExpirationDate = this.jwtService.getTokenExpirationDate(res.accessToken);
        if (tokenExpirationDate) {
          this.timeout = tokenExpirationDate.valueOf() - new Date().valueOf();
          this.expirationCounter();
        }
      })
    );
  }

  register(user: UserI) {
    return this.http.post<any>(`api/auth/register`, user);
  }

  isAuthenticated(): boolean {
    return !this.jwtService.isTokenExpired();
  }

  isAdmin(): boolean {
    let token = localStorage.getItem("hades_token");
    if (token) {
      let roles: string[] = this.jwtService.decodeToken(token).roles;
      if (roles) {
        return roles.includes(RoleType.ADMIN);
      }
    }
    return false;
  }

  isTokenExpired(): boolean {
    let token = localStorage.getItem("hades_token");
    if (token) {
      return this.jwtService.isTokenExpired(token);
    }
    return true;
  }

  getEmail(): string {
    let token = localStorage.getItem("hades_token");
    if (token) {
      let email: string = this.jwtService.decodeToken(token).sub;
      return email ? email : "";
    }
    return "";
  }

  logout(): void {
    localStorage.removeItem("hades_token");
  }

  private expirationCounter() {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(this.timeout)).subscribe(() => {
      this.logout();
      this.router.navigate(["/login"]).then();
    });
  }
}
