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
import {MoviesRestService} from '../services/movies.rest.service';
import {MoviesSharedService} from '../services/shared.movie.service';
import {KeycloakService} from 'keycloak-angular';
import { merge } from 'rxjs/observable/merge';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@NgModule({
  providers: [MoviesRestService, MoviesSharedService]
})

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  displayedColumns = ['title', 'year', 'watched', 'convert'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data: Media[] = [];


  constructor(public moviesSharedService: MoviesSharedService, private keycloakService: KeycloakService) {

  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        switchMap(() => {
          this.isLoadingResults = true;
          return this.moviesSharedService.getAllMoviesObservable();
           // this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 10000;

          return data;
        })
      ).subscribe(data =>{

     this.data= data;
      this.moviesSharedService.paginator = this.paginator;
      this.moviesSharedService.sort = this.sort;

      }
    );
  }



  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.moviesSharedService.dataSource = new MatTableDataSource(this.moviesSharedService.movies);
    this.moviesSharedService.paginator = this.paginator;
    this.moviesSharedService.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.moviesSharedService.dataSource.filter = filterValue;
  }

}
