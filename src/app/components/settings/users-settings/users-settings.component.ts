import {Component, NgModule, OnInit} from '@angular/core';
import {ComponentPageTitle} from '../../../shared/page-title/page-title';
import {UserListComponent} from './users-list/users-list.component';
import {Router} from '@angular/router';

@NgModule({
  declarations: [
    UserListComponent
  ]
})

@Component({
  selector: 'app-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.css']
})
export class UsersSettingsComponent implements OnInit {



  constructor(private router: Router, public _componentPageTitle: ComponentPageTitle) {
  }

  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - Users';

  }

}



