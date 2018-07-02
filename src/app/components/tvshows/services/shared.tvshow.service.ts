import {Injectable, NgModule, ViewChild} from '@angular/core';
import {Media} from '../../../shared/models/media/media';
import {TvShowsRestService} from './tvshows.rest.service';
import {Search} from '../../../shared/models/search/search';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {KeycloakService} from 'keycloak-angular';
import {UsersService} from '../../settings/users-settings/users-settings.service';


@NgModule({
  providers: [TvShowsRestService, UsersService]
})

@Injectable()
export class TvShowsSharedService {

  dataSource: MatTableDataSource<Media>;

  paginator: MatPaginator;
  sort: MatSort;


  constructor(private tvshowsService: TvShowsRestService, private keycloakService: KeycloakService) {
      this.tvshowsService.getTvShows().subscribe((data: Media[]) => {
        this.tvshows = data;
        this.dataSource = new MatTableDataSource(this.tvshows);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  selectedGenreList: string[];
  selectedYearFrom: number;
  selectedYearTo: number;
  tvshows: Media[];

  addGenre(newGenre: string) {
    this.selectedGenreList.push(newGenre);
    this.searchTvShows();
  }

  removeGenre(formerGenre: string) {
    for (let i = this.selectedGenreList.length - 1; i >= 0; i--) {
      if (this.selectedGenreList[i] === formerGenre) {
        this.selectedGenreList.splice(i, 1);
        break;
      }
    }
    this.searchTvShows();
  }

  changeSelectedYearFrom(newYearFrom: number) {
    this.selectedYearFrom = newYearFrom;
    this.searchTvShows();
  }

  changeSelectedYearTo(newYearTo: number) {
    this.selectedYearTo = newYearTo;
    this.searchTvShows();
  }

  getAllTvShows() {
    this.tvshowsService.getTvShows().subscribe((data: Media[]) => {
      this.tvshows = data;
      this.dataSource = new MatTableDataSource(this.tvshows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  searchTvShows() {
    let search: Search;
    search = new Search();
    search.genres = this.selectedGenreList;
    search.yearFrom = this.selectedYearFrom;
    search.yearTo = this.selectedYearTo;
    this.tvshowsService.searchTvShows(search).subscribe((data: Media[]) => {
      this.tvshows = data;
      this.dataSource = new MatTableDataSource(this.tvshows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addConvert(media: Media): void {
    this.tvshowsService.addConversion(media)
      .subscribe( data => {

      });
  };
}
