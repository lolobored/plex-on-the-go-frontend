import {Component, NgModule, OnInit} from '@angular/core';
import {ComponentPageTitle} from '../../shared/page-title/page-title';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SettingsSidenav} from './sidebar/settings-sidenav';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) {
  }

  panelOpenState: false;

  ngOnInit(): void {
    this.panelOpenState = false;
    this._componentPageTitle.title = 'Settings';
  }
}


@NgModule({
  imports: [RouterModule, CommonModule, SettingsSidenav],
  exports: [SettingsComponent],
  declarations: [SettingsComponent],
  providers: [ComponentPageTitle],
})
export class GuideListModule {
}
