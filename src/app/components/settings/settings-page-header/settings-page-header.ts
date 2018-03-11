import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import {ComponentPageTitle} from '../../../shared/page-title/page-title';
import {NavigationFocusModule} from '../../../shared/navigation-focus/navigation-focus';
import {MatButtonModule, MatIconModule} from '@angular/material';

@Component({
  selector: 'app-settings-page-header',
  templateUrl: './settings-page-header.html',
  styleUrls: ['./settings-page-header.scss']
})
export class SettingsPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule, NavigationFocusModule],
  exports: [SettingsPageHeader],
  declarations: [SettingsPageHeader],
  providers: [ComponentPageTitle],
})
export class SettingsHeaderModule { }
