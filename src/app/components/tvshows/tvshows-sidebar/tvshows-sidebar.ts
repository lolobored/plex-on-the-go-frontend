import {
  animate,
  Component,
  Input,
  NgModule,
  NgZone,
  OnDestroy,
  OnInit,
  state,
  style,
  transition,
  trigger,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatCheckboxModule, MatIconModule, MatSidenav, MatSidenavModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HeaderModule} from '../../../shared/page-header/page-header';
import {FormsModule} from '@angular/forms';
import {TvShowsRestService} from '../services/tvshows.rest.service';
import {TvShowsSharedService} from '../services/shared.tvshow.service';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-tvshows-sidebar',
  templateUrl: './tvshows-sidebar.html',
  styleUrls: ['./tvshows-sidebar.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class TvShowsSidebar implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  params: Observable<Params>;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}


@Component({
  selector: 'app-tvshows-bar',
  templateUrl: './tvshows-bar.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class TvShowsBar implements OnInit, OnDestroy {

  @Input() params: Observable<Params>;
  expansions = {};

  checkedTvShows = {};

  private _onDestroy = new Subject<void>();

  shows: string[];

  constructor(private _router: Router, private tvshowRestService: TvShowsRestService,
              private tvshowsSharedService: TvShowsSharedService) {
    // retrieving the list of genre
    this.tvshowRestService.getTvShowsList()
      .subscribe((data: string[]) => {
        this.shows = data;
        this.tvshowsSharedService.selectedTvShowList = data.slice();
        for (const index in data) {
          this.checkedTvShows[data[index]] = true;
        }
      });
  }

  ngOnInit() {

  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  /** Gets the expanded state */
  _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  /** Toggles the expanded state */
  toggleExpand(category: string) {
    if (typeof this.expansions[category] === 'undefined') {
      this.expansions[category] = false;
    }
    this.expansions[category] = !this.expansions[category];
  }

  /** Gets whether expanded or not */
  getExpanded(category: string): boolean {
    return this.expansions[category];
  }

  toggleTvShow(tvshow, event) {
    if (event.checked === false) {
      this.tvshowsSharedService.removeTvShow(tvshow);
      this.checkedTvShows[tvshow] = false;
    } else {
      this.tvshowsSharedService.addTvShow(tvshow);
      this.checkedTvShows[tvshow] = true;
    }
  }

  toggleAll(event) {

    if (event.checked === false) {
      for (const show in this.checkedTvShows) {
        this.checkedTvShows[show] = false;
      }
      this.tvshowsSharedService.removeAllTvShows();
    }
    else {
      for (const show in this.checkedTvShows) {
        this.checkedTvShows[show] = true;
      }
      this.tvshowsSharedService.addAllTvShows(this.shows);
    }
  }
}

}


@NgModule({
  imports: [
    MatSidenavModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    HeaderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    FormsModule
  ],
  exports: [TvShowsSidebar],
  declarations: [TvShowsSidebar, TvShowsBar],
  providers: [TvShowsRestService, TvShowsSharedService],
})
export class TvShowsSidebarModule {
}
