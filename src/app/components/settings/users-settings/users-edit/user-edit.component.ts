import {Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ComponentPageTitle} from '../../../../shared/page-title/page-title';
import {ErrorStateMatcher} from '@angular/material';
import {User} from '../../../../shared/models/user';
import {UsersService} from '../users-settings.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEditUrl = new FormControl('', [Validators.required, Validators.pattern('https?://.*')]);
  hide = true;
  editMode = false;
  user: User = new User();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  userNameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  types = [ {value: 'User', viewValue: 'User'},
    {value: 'Admin', viewValue: 'Admin'},];

  matcher = new MyErrorStateMatcher();

  constructor(public _componentPageTitle: ComponentPageTitle,
              private userService: UsersService,
              private _route: ActivatedRoute,
              private routerService: Router) {
    console.log(routerService);


  }



  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - User';
    this._route.params.subscribe(res => this.initializeUser(res));
  }

  initializeUser(res: Params): void {
    if (res.id === undefined){
      this.user = new User();
      this.editMode = false;
    } else {
      this.userService.getUser(res.id).subscribe(user => this.user = user);
      this.editMode = true;
    }
  }

  getErrorMessage() {
    return this.userEditUrl.hasError('required') ? 'You must enter a value' :
      this.userEditUrl.hasError('email') ? 'Not a valid email' :
        'Not a valid url';
  }

  editUser(): void {
    if (!this.editMode) {
      this.userService.createUser(this.user);
    }
    else{
      this.userService.updateUser(this.user);
    }
  }

}
