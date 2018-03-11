import {
  Component, Input, NgZone, ViewEncapsulation, ViewChild, OnInit, NgModule, trigger, state,
  animate, transition, style, OnDestroy
} from '@angular/core';
import {DocumentationItems} from '../settings-items/settings-items';
import {MatSidenav, MatSidenavModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {switchMap} from 'rxjs/operators/switchMap';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {startWith} from 'rxjs/operators/startWith';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {SettingsHeaderModule} from '../settings-page-header/settings-page-header';


const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-settings-sidenav',
  templateUrl: './settings-sidenav.html',
  styleUrls: ['./settings-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsSidenav implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  params: Observable<Params>;

  constructor(public docItems: DocumentationItems,
              private _route: ActivatedRoute,
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

    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}

@Component({
  selector: 'app-settings-nav',
  templateUrl: './settings-nav.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', visibility: 'hidden'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class SettingsNav implements OnInit, OnDestroy {

  @Input() params: Observable<Params>;
  expansions = {};
  private _onDestroy = new Subject<void>();

  constructor(public docItems: DocumentationItems,
              private _router: Router) { }

  ngOnInit() {
    this._router.events.pipe(
      startWith(null),
      switchMap(() => this.params),
      takeUntil(this._onDestroy)
    ).subscribe(p => this.setExpansions(p));
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Set the expansions based on the route url */
  setExpansions(params: Params) {
    const categories = this.docItems.getCategories(params.section);
    for (const category of categories) {
      if (this.expansions[category.id] === true) {
        continue;
      }

      let match = false;
      for (const item of category.items) {
        if (this._router.url.indexOf(item.id) > -1) {
          match = true;
          break;
        }
      }
      this.expansions[category.id] = match;
    }
  }

  /** Gets the expanded state */
  _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  /** Toggles the expanded state */
  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  /** Gets whether expanded or not */
  getExpanded(category: string): boolean {
    return this.expansions[category];
  }

}


@NgModule({
  imports: [
    MatSidenavModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    SettingsHeaderModule
  ],
  exports: [SettingsSidenav],
  declarations: [SettingsSidenav, SettingsNav],
  providers: [DocumentationItems],
})
export class SettingsSidenavModule {}
