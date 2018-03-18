import {
  Component, Input, NgZone, ViewEncapsulation, ViewChild, OnInit, NgModule, trigger, state,
  animate, transition, style, OnDestroy
} from '@angular/core';
import {
  MatSidenav, MatSidenavModule, MatIconModule, MatCheckboxModule, MatSlideToggleModule, MatTableDataSource,
  MatSliderModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HeaderModule} from '../../../shared/page-header/page-header';
import {FormsModule} from '@angular/forms';
import {MoviesRestService} from '../services/movies.rest.service';
import {MoviesSharedService} from '../services/shared.movie.service';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-movies-sidebar',
  templateUrl: './movies-sidebar.html',
  styleUrls: ['./movies-sidebar.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MoviesSidebar implements OnInit {
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
  selector: 'app-movies-bar',
  templateUrl: './movies-bar.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class MoviesBar implements OnInit, OnDestroy {

  @Input() params: Observable<Params>;
  expansions = {};
  private _onDestroy = new Subject<void>();
  category: string;
  genres: string[];
  years: number[];

  // sliders
  maxFrom = 100;
  minFrom = 0;
  maxTo = 100;
  minTo = 0;
  valueFrom = 0;
  valueTo = 0;

  constructor(private _router: Router, private movieRestService: MoviesRestService,
              private moviesSharedService: MoviesSharedService) {
    // retrieving the list of genre
    this.movieRestService.getGenre()
      .subscribe( (data: string[]) => {
        this.genres = data;
        this.moviesSharedService.selectedGenreList = data.slice();
      });
    // retrieving the list of genre
    this.movieRestService.getYears()
      .subscribe( (data: number[]) => {
        this.years = data;
        this.minFrom = data[0];
        this.minTo = data[0];
        moviesSharedService.selectedYearFrom = data[0];
        this.valueFrom = data[0];
        this.maxFrom = data[data.length - 1];
        this.maxTo = data[data.length - 1];
        this.valueTo = data[data.length - 1];
        moviesSharedService.selectedYearTo = data[data.length - 1];
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

  toggleGenre(genre, event) {
    if (event.checked === false){
      this.moviesSharedService.removeGenre(genre);
    } else {
      this.moviesSharedService.addGenre(genre);
    }
    console.log(event.checked);
    console.log(genre);
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
  exports: [MoviesSidebar],
  declarations: [MoviesSidebar, MoviesBar],
  providers: [MoviesRestService, MoviesSharedService],
})
export class MoviesSidebarModule {}
