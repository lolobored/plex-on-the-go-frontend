import {Injectable, NgModule, ViewChild} from '@angular/core';
import {Media} from '../../../shared/models/media/media';
import {MoviesRestService} from './movies.rest.service';
import {Search} from '../../../shared/models/search/search';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {KeycloakService} from 'keycloak-angular';
import {UsersService} from '../../settings/users-settings/users-settings.service';


@NgModule({
  providers: [MoviesRestService, UsersService]
})

@Injectable()
export class MoviesSharedService {

  dataSource: MatTableDataSource<Media>;

  paginator: MatPaginator;
  sort: MatSort;


  constructor(private moviesService: MoviesRestService, private keycloakService: KeycloakService) {
      this.moviesService.getMovies().subscribe((data: Media[]) => {
        this.movies = data;
        this.dataSource = new MatTableDataSource(this.movies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  selectedGenreList: string[];
  selectedYearFrom: number;
  selectedYearTo: number;
  movies: Media[];

  addGenre(newGenre: string) {
    this.selectedGenreList.push(newGenre);
    this.searchMovies();
  }

  removeGenre(formerGenre: string) {
    for (let i = this.selectedGenreList.length - 1; i >= 0; i--) {
      if (this.selectedGenreList[i] === formerGenre) {
        this.selectedGenreList.splice(i, 1);
        break;
      }
    }
    this.searchMovies();
  }

  removeAllGenres() {
    this.selectedGenreList = [];
    this.searchMovies();
  }

  addAllGenres(genres: string[]) {
    // ensure it is empty
    this.selectedGenreList = [];

    for (const index in genres) {
      this.selectedGenreList.push(genres[index]);
    }
    this.searchMovies();
  }

  changeSelectedYearFrom(newYearFrom: number) {
    this.selectedYearFrom = newYearFrom;
    this.searchMovies();
  }

  changeSelectedYearTo(newYearTo: number) {
    this.selectedYearTo = newYearTo;
    this.searchMovies();
  }

  getAllMovies() {
    if (this.movies === undefined) {
      this.moviesService.getMovies().subscribe((data: Media[]) => {
        this.movies = data;
        this.dataSource = new MatTableDataSource(this.movies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }


  searchMovies() {
    let search: Search;
    search = new Search();
    search.genres = this.selectedGenreList;
    search.yearFrom = this.selectedYearFrom;
    search.yearTo = this.selectedYearTo;
    this.moviesService.searchMovies(search).subscribe((data: Media[]) => {
      this.movies = data;
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addConvert(media: Media): void {
    this.moviesService.addConversion(media)
      .subscribe( data => {

      });
  };
}
