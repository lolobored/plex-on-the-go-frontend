import {Component, NgModule, OnInit} from '@angular/core';
import {SettingsSidenav} from '../settings/sidebar/settings-sidenav';
import {SettingsComponent} from '../settings/settings.component';
import {ComponentPageTitle} from '../../shared/page-title/page-title';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MoviesSidebar} from './movies-sidebar/movies-sidebar';
import {MatCheckboxModule} from '@angular/material';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) {
  }

  panelOpenState: false;

  ngOnInit(): void {
    this.panelOpenState = false;
    this._componentPageTitle.title = 'Movies';
  }
}


@NgModule({
  imports: [RouterModule, CommonModule, MoviesSidebar],
  exports: [MoviesComponent],
  declarations: [MoviesComponent],
  providers: [ComponentPageTitle],
})
export class MoviesModule {
}
