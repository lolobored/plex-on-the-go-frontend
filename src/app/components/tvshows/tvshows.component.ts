import {Component, NgModule, OnInit} from '@angular/core';
import {SettingsSidenav} from '../settings/sidebar/settings-sidenav';
import {SettingsComponent} from '../settings/settings.component';
import {ComponentPageTitle} from '../../shared/page-title/page-title';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TvShowsSidebar} from './tvshows-sidebar/tvshows-sidebar';
import {MatCheckboxModule} from '@angular/material';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvShowsComponent implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) {
  }

  panelOpenState: false;

  ngOnInit(): void {
    this.panelOpenState = false;
    this._componentPageTitle.title = 'TvShows';
  }
}


@NgModule({
  imports: [RouterModule, CommonModule, TvShowsSidebar],
  exports: [TvShowsComponent],
  declarations: [TvShowsComponent],
  providers: [ComponentPageTitle],
})
export class TvShowsModule {
}
