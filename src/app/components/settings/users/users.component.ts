import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {ComponentPageTitle} from '../../../shared/page-title/page-title';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-settings-plex',
  templateUrl: './plex.component.html',
  styleUrls: ['./plex.component.css']
})
export class PlexComponent implements OnInit {

  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(public _componentPageTitle: ComponentPageTitle) {
  }

  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - Plex';
  }

}
