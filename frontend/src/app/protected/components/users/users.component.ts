import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/User";
import {AlertBroker} from "../../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../../alert/alert.model";
import {RoleType} from "../../classes/enums/RoleType";
import {StatusType} from "../../classes/enums/StatusType";

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

  changeToAdmin(user: User) {
    this.userService.changeToAdmin(user.userId).subscribe((newUser) => {
      const index = this.users.findIndex(u => u.userId === newUser.userId);
      if (index >= 0) {
        this.users.splice(index, 1, newUser);
      }
      this.alertBroker.add(SuccessResponse.USER_ROLE_CHANGE_SUCCESS, AlertType.SUCCESS);
    })
  }

  changeToUser(user: User) {
    this.userService.changeToUser(user.userId).subscribe((newUser) => {
      const index = this.users.findIndex(u => u.userId === newUser.userId);
      if (index >= 0) {
        this.users.splice(index, 1, newUser);
      }
      this.alertBroker.add(SuccessResponse.USER_ROLE_CHANGE_SUCCESS, AlertType.SUCCESS);
    })
  }

  deleteUser(user: User) {
    this.userService.deleteUserById(user.userId).subscribe(() => {
      const index = this.users.findIndex(u => u.userId === user.userId);
      if (index >= 0) {
        this.users.splice(index, 1);
      }
      this.alertBroker.add(SuccessResponse.USER_DELETE_SUCCESS, AlertType.SUCCESS);
    })
  }


  isAdmin(user: User) {
    return RoleType.ADMIN === user.role;
  }

  isRegularUser(user: User) {
    return RoleType.USER === user.role;
  }

  isActivated(user: User) {
    return StatusType.ACTIVATED === user.status;
  }

  isDeactivated(user: User) {
    return StatusType.REGISTERED === user.status;
  }

}
