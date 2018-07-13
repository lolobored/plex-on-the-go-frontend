import {Injectable, NgModule} from '@angular/core';
import {Media} from '../../../shared/models/media/media';
import {MoviesRestService} from './movies.rest.service';
import {SearchRequest} from '../../../shared/models/search/searchRequest';
import {MatPaginator, MatSort, PageEvent} from '@angular/material';
import {KeycloakService} from 'keycloak-angular';
import {UsersService} from '../../settings/users-settings/users-settings.service';
import {Observable} from 'rxjs/Observable';
import {SearchResponse} from '../../../shared/models/search/SearchResponse';
import 'rxjs/add/observable/forkJoin';


@NgModule({
  providers: [MoviesRestService, UsersService]
})

@Injectable()
export class MoviesSharedService {

  paginator: MatPaginator;
  sort: MatSort;


  constructor(private moviesService: MoviesRestService, private keycloakService: KeycloakService) {
    this.getGenreAndYears().toPromise().then(res => {
      this.searchMovies().subscribe((searchResponse: SearchResponse) => {

        this.movies = searchResponse.results;
        this.paginator = this.paginator;
        this.sort = this.sort;
        this.totalResult = searchResponse.total;
      });

    });
  }

    selectedGenreList: string[];
    checkedGenre = {};
    genres: string[];
    selectedYearFrom: number;
    selectedYearTo: number;
    years: number[];
    movies: Media[];

    // page settings
    pageNumber = 0;
    pageSize = 10;
    totalResult: number;

    // MatPaginator Output
    pageEvent: PageEvent;

    // sidebar years
    maxFrom = 100;
    minFrom = 0;
    maxTo = 100;
    minTo = 0;
    valueFrom = 0;
    valueTo = 0;


    getGenreAndYears(){
      return Observable.forkJoin(
        this.moviesService.getGenre().toPromise()
          .then((data: string[]) => {
            this.selectedGenreList = data;
            this.genres = data;
          }),
        this.moviesService.getYears().toPromise()
          .then((data: number[]) => {
            this.years = data;
            this.minFrom = data[0];
            this.minTo = data[0];
            this.selectedYearFrom = data[0];
            this.valueFrom = data[0];
            this.maxFrom = data[data.length - 1];
            this.maxTo = data[data.length - 1];
            this.valueTo = data[data.length - 1];
            this.selectedYearTo = data[data.length - 1];
          })
      );
    }

    addGenre(newGenre: string)
    {
      this.selectedGenreList.push(newGenre);
      this.searchMovies();
    }

    removeGenre(formerGenre : string)
    {
      for (let i = this.selectedGenreList.length - 1; i >= 0; i--) {
        if (this.selectedGenreList[i] === formerGenre) {
          this.selectedGenreList.splice(i, 1);
          break;
        }
      }
      this.searchMovies();
    }

    removeAllGenres()
    {
      this.selectedGenreList = [];
      this.searchMovies();
    }

    addAllGenres(genres: string[])
    {
      // ensure it is empty
      this.selectedGenreList = [];

      for (const index in genres) {
        this.selectedGenreList.push(genres[index]);
      }
      this.searchMovies();
    }

    changeSelectedYearFrom(newYearFrom: number)
    {
      this.selectedYearFrom = newYearFrom;
      this.searchMovies();
    }

    changeSelectedYearTo(newYearTo: number)
    {
      this.selectedYearTo = newYearTo;
      this.searchMovies();
    }

    searchMovies(): Observable <SearchResponse> {
      let search: SearchRequest;
    // prepare search
    search = new SearchRequest();
    search.genres = this.selectedGenreList;
    search.yearFrom = this.selectedYearFrom;
    search.yearTo = this.selectedYearTo;
    if (this.pageEvent === undefined) {
      search.pageNumber = this.pageNumber;
      search.resultPerPage = this.pageSize;
    } else {
      search.pageNumber = this.pageEvent.pageIndex;
      search.resultPerPage = this.pageSize;
    }

    return this.moviesService.searchMovies(search);
  }

    addConvert(media: Media): void {
      this.moviesService.addConversion(media)
      .subscribe(data => {

      });
  }

}
