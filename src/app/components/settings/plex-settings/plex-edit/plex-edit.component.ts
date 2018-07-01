import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ComponentPageTitle} from '../../../../shared/page-title/page-title';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CustomValidators, errorMessages} from './custom.validator';
import {PlexUserService} from '../plex-settings.service';
import {PlexUser} from '../../../../shared/models/plexusers/plexuser';
import {_catch} from 'rxjs/operator/catch';
import {User} from '../../../../shared/models/user/user';


@NgModule({
  providers: [PlexUserService]
})

@Component({
  selector: 'app-user-edit',
  templateUrl: './plex-edit.component.html',
  styleUrls: ['./plex-edit.component.css']
})
export class PlexEditComponent implements OnInit {

  hidePlexPassword = true;

  plexUser = new PlexUser();
  plexUsers: PlexUser[];

  userRegistrationForm: FormGroup;
  errors = errorMessages;

  emailFormControl: FormControl;


  constructor(public _componentPageTitle: ComponentPageTitle,
              private plexService: PlexUserService,
              private plexSnackBar: MatSnackBar,
              private _route: ActivatedRoute,
              private routerService: Router,
              private location: Location,
              private formBuilder: FormBuilder) {

  }

  createForm() {

    this.emailFormControl = new FormControl('', [
      CustomValidators.customEmailValidator
    ]);

    this.userRegistrationForm =
      new FormGroup({
        emailCheck: this.emailFormControl
      });
  }


  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - Plex';
    this._route.params.subscribe(res => this.initializePlex(res));
    this.createForm();

  }

  initializePlex(res: Params): void {

  }

  editPlex(): void {
    if (this.userRegistrationForm.valid) {
      this.plexService.saveUsers(this.plexUser).subscribe( data =>
        this.location.back()
      );

    }

  }

  cancel(): void {

    this.location.back();
  }

  testPlexLogin() {
      this.plexService.getPlexUserDetails(this.plexUser).subscribe((users: PlexUser[]) => {
        if (users !== undefined) {
          this.plexSnackBar.open('Test was successful and ' + users.length + ' users were retrieved',
            'Ok', {
              duration: 2000,
            });
        } else {
          this.plexSnackBar.open('Test was unsuccessful', 'Ok', {
            duration: 2000,
          });
        }
      }
    );
  }

}
