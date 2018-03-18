import {Injectable, NgModule, ViewChild} from '@angular/core';
import {Media} from '../../../shared/models/media/media';
import {MoviesRestService} from './movies.rest.service';
import {Search} from '../../../shared/models/search/search';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@NgModule({
  providers: [MoviesRestService]
})

@Injectable()
export class MoviesSharedService {

  dataSource: MatTableDataSource<Media>;

  paginator: MatPaginator;
  sort: MatSort;

  constructor(private moviesService: MoviesRestService) {

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
      console.log('this.selectedGenreList[i] ' + this.selectedGenreList[i]);
      console.log('formerGenre ' + formerGenre);
      if (this.selectedGenreList[i] === formerGenre) {
        console.log(this.selectedGenreList.length);
        this.selectedGenreList.splice(i, 1);
        console.log('removing ' + formerGenre);
        console.log(this.selectedGenreList.length);
        break;
      }
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

  searchMovies() {
    var search: Search;
    search = new Search();
    search.genres = this.selectedGenreList;
    this.moviesService.searchMovies(search).subscribe((data: Media[]) => {
      this.movies = data;
      this.dataSource = new MatTableDataSource(this.movies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
