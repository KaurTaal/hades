import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomValidators} from "../../_helpers/custom.validators";
import {AlertType} from "../../../alert/alert.model";
import {AlertBroker} from "../../../alert/alert-broker";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'hades-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required])
    },
    {
      validators: CustomValidators.passwordsMatching
    },
  );

  constructor(private router: Router, private alertBroker: AlertBroker, private authService: AuthService) { }

  register() {
    if (this.form.valid) {
      this.authService.register({
        email: this.email.value,
        password: this.password.value
      }).subscribe(() => {
        this.alertBroker.add("Registreeritud!", AlertType.SUCCESS);
        this.router.navigate(["../login"]).then();
      })
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }

  isFormValid() {
    return !this.form.valid;
  }

}
