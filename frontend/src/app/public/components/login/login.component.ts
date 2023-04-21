import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'hades-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  errorMsg = '';
  successMsg = '';

  private routeParamsSub?: Subscription;


  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.routeParamsSub = this.route.queryParams.subscribe(
      (param: any) => {
        let messageParam = param["message"];
        if (messageParam) {
          switch (messageParam) {
            case 'logout':
              this.setSuccessMsg("Olete välja logitud.")
              break;
          }
        }
      }
    )

    setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
        this.router.navigate(['auth', 'login'], {queryParams: {message: 'logout'}}).then();
      }
    });
  }

  ngOnDestroy() {
    if (this.routeParamsSub) {
      this.routeParamsSub.unsubscribe();
    }
  }

  login() {
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
    }
    if (this.form.valid) {
      this.authService.login({
        email: this.email.value,
        password: this.password.value
      }).subscribe((res) => {
        localStorage.setItem("hades_token", res.accessToken)
        this.router.navigate(["../../protected/exercises"]).then();
      })
    }
  }

  isFormValid() {
    return !this.form.valid;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  private setSuccessMsg(msg: string): void {
    this.successMsg = msg;
    this.errorMsg = "";
  }

  private setErrorMsg(msg: string): void {
    this.errorMsg = msg;
    this.successMsg = "";
  }


}
