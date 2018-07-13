import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, PageEvent,} from '@angular/material';
import {MoviesRestService} from '../services/movies.rest.service';
import {MoviesSharedService} from '../services/shared.movie.service';
import {KeycloakService} from 'keycloak-angular';
import {merge} from 'rxjs/observable/merge';
import {map, switchMap} from 'rxjs/operators';

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

  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(public moviesSharedService: MoviesSharedService, private keycloakService: KeycloakService) {

  }

  ngOnInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    //this.paginator.page.subscribe(() => this.paginator.pageIndex = 0);


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        switchMap(() => {

          return this.moviesSharedService.searchMovies();

        }),
        map(searchResponse => {
          this.moviesSharedService.totalResult = searchResponse.total;

          return searchResponse;
        })
      ).subscribe(searchResponse => {

        this.moviesSharedService.movies = searchResponse.results;
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
    this.moviesSharedService.paginator = this.paginator;
    this.moviesSharedService.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    //this.moviesSharedService.dataSource.filter = filterValue;
  }

  changePage(event: PageEvent) {
    this.moviesSharedService.pageNumber= event.pageIndex;
    this.moviesSharedService.pageSize = event.pageSize;
    this.moviesSharedService.searchMovies().subscribe(searchResponse => {

      this.moviesSharedService.movies = searchResponse.results;
      this.moviesSharedService.paginator = this.paginator;
      this.moviesSharedService.sort = this.sort;
      this.moviesSharedService.totalResult = searchResponse.total;


    });
    return event;
  }
}
