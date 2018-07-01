import {Component, NgModule, OnInit} from '@angular/core';
import {ComponentPageTitle} from '../../../shared/page-title/page-title';
import {Router} from '@angular/router';
import {PlexUsersListComponent} from './plex-users-list/plex-users-list.component';

@NgModule({
  declarations: [
    PlexUsersListComponent
  ]
})

@Component({
  selector: 'app-plex-settings',
  templateUrl: './plex-settings.component.html',
  styleUrls: ['./plex-settings.component.css']
})
export class PlexSettingsComponent implements OnInit {



  constructor(private router: Router, public _componentPageTitle: ComponentPageTitle) {
  }

  ngOnInit(): void {
    this._componentPageTitle.title = 'Settings - Plex';

  }

}



