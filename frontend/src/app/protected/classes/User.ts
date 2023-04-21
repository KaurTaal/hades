import {RoleType} from "./enums/RoleType";
import {StatusType} from "./enums/StatusType";

export class User {
  userId: number;
  email: string;
  role: RoleType;
  status: StatusType;
  isActivated: boolean;

  constructor(userId: number, email: string, role: RoleType, status: StatusType, isActivated: boolean) {
    this.userId = userId;
    this.email = email;
    this.role = role;
    this.status = status;
    this.isActivated = isActivated;
  }
}
