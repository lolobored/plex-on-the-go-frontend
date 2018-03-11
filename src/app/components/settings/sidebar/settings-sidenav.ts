import {
  Component, Input, NgZone, ViewEncapsulation, ViewChild, OnInit, NgModule, trigger, state,
  animate, transition, style, OnDestroy
} from '@angular/core';
import {MatSidenav, MatSidenavModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {SettingsHeaderModule} from '../settings-page-header/settings-page-header';

import {switchMap} from 'rxjs/operators/switchMap';
import {takeUntil} from 'rxjs/operators/takeUntil';
import {startWith} from 'rxjs/operators/startWith';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {log} from 'util';

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
  category: string;

  constructor(private _router: Router) {

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
  providers: [],
})
export class SettingsSidenavModule {}
