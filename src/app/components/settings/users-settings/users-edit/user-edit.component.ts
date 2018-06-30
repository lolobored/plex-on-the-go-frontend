import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComponentPageTitle} from '../../../../shared/page-title/page-title';
import {MatSnackBar} from '@angular/material';
import {User} from '../../../../shared/models/user/user';
import {UsersService} from '../users-settings.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {
  ConfirmValidParentMatcher, CustomValidators,
  errorMessages
} from './custom.validator';
import {PlexService} from '../plex.service';
import {UserServiceAuth} from '../../../../utils/user-service-auth';




@NgModule({
  providers: [UsersService,
    PlexService]
})

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  hideUserPassword = true;
  hideUserRepeatPassword = true;
  hidePlexPassword = true;
  editMode = false;
  user: User = new User();
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userRegistrationForm: FormGroup;
  errors = errorMessages;
  userNameFormControl: FormControl;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  confirmPasswordFormControl: FormControl;


  constructor(public _componentPageTitle: ComponentPageTitle,
              private userService: UsersService,
              private plexService: PlexService,
              private plexSnackBar: MatSnackBar,
              private _route: ActivatedRoute,
              private routerService: Router,
              private location: Location,
              private formBuilder: FormBuilder,
              private userAuthService: UserServiceAuth) {

  }

  createForm() {
    this.userNameFormControl = new FormControl({value: this.user.userName, disabled: this.editMode},
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('[a-z0-9]+')
      ]);

    this.passwordFormControl = new FormControl('', [
      CustomValidators.customPasswordValidator(this.editMode)
    ]);
    this.confirmPasswordFormControl = new FormControl('', [
      CustomValidators.customPasswordValidator(this.editMode)
    ]);
    this.emailFormControl = new FormControl('', [
      CustomValidators.customEmailValidator
    ]);

    this.userRegistrationForm =
      new FormGroup({
        usernameCheck: this.userNameFormControl,
        emailCheck: this.emailFormControl,
        passwordGroup: this.formBuilder.group({
          password: this.passwordFormControl,
          confirmPassword: this.confirmPasswordFormControl
        }, {validator: CustomValidators.childrenEqual})
      });

  }


  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - User';
    this._route.params.subscribe(res => this.initializeUser(res));
    this.createForm();

  }

  initializeUser(res: Params): void {
    if (location.pathname.endsWith('/profile')) {
      this.userService.getUserByUserName(this.userAuthService.getUsername()).subscribe((user: User) =>
        this.user = user
      );
      this.editMode = true;
    } else {
      if (res.id === undefined) {
        this.user = new User();
        this.editMode = false;
      } else {
        this.userService.getUser(res.id).subscribe((user: User) =>
          this.user = user
        );
        this.editMode = true;
      }
    }
  }

  editUser(): void {
    if (this.userRegistrationForm.valid) {
      if (!this.editMode) {
        this.userService.createUser(this.user).subscribe((user: User) =>
          this.location.back()
        );
      } else {
        this.userService.updateUser(this.user).subscribe((user: User) =>
          this.location.back()
        );
      }
    }

  }

  cancel(): void {

    this.location.back();
  }

  testPlexLogin() {
    this.plexService.plexLogin(this.user.plexLogin, this.user.plexPassword).subscribe((result: boolean) => {
        if (result) {
          this.plexSnackBar.open('Plex Login was successful', 'Ok', {
            duration: 2000,
          });
        } else {
          this.plexSnackBar.open('Plex Login was unsuccessful', 'Ok', {
            duration: 2000,
          });
        }
      }
    );
  }

  isAdmin() {
    return this.userAuthService.isAdmin();
  }
}
