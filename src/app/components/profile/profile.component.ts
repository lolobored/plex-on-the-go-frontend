import {Component, NgModule, OnInit} from '@angular/core';
import {UsersService} from '../settings/users-settings/users-settings.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ComponentPageTitle} from '../../shared/page-title/page-title';
import {User} from '../../shared/models/user/user';
import {AppAuthGuard} from '../../app.authguard';
import {KeycloakService} from 'keycloak-angular';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@NgModule({
  providers: [UsersService]
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hideUserPassword = true;
  hideUserRepeatPassword = true;
  hidePlexPassword = true;
  user: User = new User();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  userNameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  userName: string;

  constructor(public _componentPageTitle: ComponentPageTitle,
              private userService: UsersService,
              private _route: ActivatedRoute,
              private routerService: Router,
              private location: Location,
    protected keycloakAngular: KeycloakService) {
    this.userName = keycloakAngular.getUsername();
  }


  ngOnInit(): void {
    this._route.params.subscribe(res => this.initializeUser());
    this._componentPageTitle.title = 'Profile - ' + this.user.userName;

  }

  initializeUser(): void {
    this.userService.getUserByUserName(this.userName).subscribe((user: User) =>
      this.user = user
    );

  }

  editUser(): void {
    this.userService.createUser(this.user).subscribe((user: User) =>
      this.location.back()
    );
  }

  cancel(): void {

    this.location.back();
  }

}
