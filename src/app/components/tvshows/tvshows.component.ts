import {Component, NgModule, OnInit} from '@angular/core';
import {ComponentPageTitle} from '../../shared/page-title/page-title';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TvShowsSidebar} from './tvshows-sidebar/tvshows-sidebar';

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
    this._componentPageTitle.title = 'Tv Shows';
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
