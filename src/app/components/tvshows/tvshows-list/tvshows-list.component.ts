import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from '@angular/material';
import {Media} from '../../../shared/models/media/media';
import {TvShowsRestService} from '../services/tvshows.rest.service';
import {TvShowsSharedService} from '../services/shared.tvshow.service';
import {KeycloakService} from 'keycloak-angular';
import {User} from '../../../shared/models/user/user';

@NgModule({
  providers: [TvShowsRestService, TvShowsSharedService]
})

@Component({
  selector: 'app-tvshows-list',
  templateUrl: './tvshows-list.component.html',
  styleUrls: ['./tvshows-list.component.css']
})
export class TvShowsListComponent implements OnInit {
  displayedColumns = ['show', 'season', 'episode', 'title', 'watched', 'convert'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tvshowsSharedService: TvShowsSharedService, private keycloakService: KeycloakService) {
    this.tvshowsSharedService.getAllTvShows();
  }

  ngOnInit() {

    this.tvshowsSharedService.dataSource = new MatTableDataSource(this.tvshowsSharedService.tvshows);
    this.tvshowsSharedService.paginator = this.paginator;
    this.tvshowsSharedService.sort = this.sort;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.tvshowsSharedService.dataSource = new MatTableDataSource(this.tvshowsSharedService.tvshows);
    this.tvshowsSharedService.paginator = this.paginator;
    this.tvshowsSharedService.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.tvshowsSharedService.dataSource.filter = filterValue;
  }

}
