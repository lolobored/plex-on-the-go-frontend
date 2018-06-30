import {Component, NgModule, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker/theme-picker';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTableDataSource} from '@angular/material';
import {CommonModule} from '@angular/common';
import {UsersService} from '../../components/settings/users-settings/users-settings.service';
import {User} from '../models/user/user';
import {UserServiceAuth} from '../../utils/user-service-auth';
import {KeycloakService} from 'keycloak-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string;
  user: User;
  userId: string;

  constructor(private userService: UsersService,
              private userAuthService: UserServiceAuth,
              private keycloakService: KeycloakService) {
    this.username = this.userAuthService.getUsername();
    this.userService.getUserByUserName(this.username).subscribe((user: User) => {
        this.user = user;
        this.userId = this.user.id;
      }
    );
  }

  ngOnInit() {
  }

  logout() {
    this.keycloakService.logout();
  }

  isAdmin() {
    return this.userAuthService.isAdmin();
  }

}

@NgModule({
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterModule, ThemePickerModule, CommonModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [UsersService]
})
export class NavBarModule {}
