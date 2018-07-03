import {Injectable, NgModule} from '@angular/core';
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

  selectedTvShowList: string[];
  selectedYearFrom: number;
  selectedYearTo: number;
  tvshows: Media[];

  addTvShow(tvshow: string) {
    this.selectedTvShowList.push(tvshow);
    this.searchTvShows();
  }

  removeTvShow(tvShow: string) {
    for (let i = this.selectedTvShowList.length - 1; i >= 0; i--) {
      if (this.selectedTvShowList[i] === tvShow) {
        this.selectedTvShowList.splice(i, 1);
        break;
      }
    }
    this.searchTvShows();
  }

  removeAllTvShows() {
    this.selectedTvShowList = [];
    this.searchTvShows();
  }

  addAllTvShows(tvShows: string[]) {
    // ensure it is empty
    this.selectedTvShowList = [];

    for (const index in tvShows) {
      this.selectedTvShowList.push(tvShows[index]);
    }
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
    search.showTitles = this.selectedTvShowList;

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
      .subscribe(data => {

      });
  };
}
