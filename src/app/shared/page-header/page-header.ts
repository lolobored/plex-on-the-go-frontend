import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import {ComponentPageTitle} from '../page-title/page-title';
import {NavigationFocusModule} from '../navigation-focus/navigation-focus';
import {MatButtonModule, MatIconModule} from '@angular/material';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.scss']
})
export class PageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule, NavigationFocusModule],
  exports: [PageHeader],
  declarations: [PageHeader],
  providers: [ComponentPageTitle],
})
export class HeaderModule { }
