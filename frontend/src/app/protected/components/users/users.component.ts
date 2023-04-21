import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/User";
import {AlertBroker} from "../../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../../alert/alert.model";

@Component({
  selector: 'hades-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private alertBroker: AlertBroker) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => this.users = res);
  }


  activateUser(user: User) {
    this.userService.activateUser(user.userId).subscribe((newUser) => {
      const index = this.users.findIndex(u => u.userId === newUser.userId);
      if (index >= 0) {
        this.users.splice(index, 1, newUser);
      }
      this.alertBroker.add(SuccessResponse.USER_ACTIVATED_SUCCESS, AlertType.SUCCESS);
    })
  }

  deactivateUser(user: User) {
    this.userService.deactivateUser(user.userId).subscribe((newUser) => {
      const index = this.users.findIndex(u => u.userId === newUser.userId);
      if (index >= 0) {
        this.users.splice(index, 1, newUser);
      }
      this.alertBroker.add(SuccessResponse.USER_DEACTIVATED_SUCCESS, AlertType.SUCCESS);
    })
  }

}
