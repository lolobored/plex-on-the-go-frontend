import { Component } from '@angular/core';
import {LoginService} from "./login.service";
import {UserComponent} from "./user/user.component";

class User {
  private username: string;
  private password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [LoginService]
})
export class LoginComponent {
  public user = new UserComponent('','');
  public errorMsg = '';

  constructor(private loginService:LoginService) { }

  login() {
    if(!this.loginService.login(this.user)) {
      this.errorMsg = 'Failed to login! try again ...';
    }
  }
}
