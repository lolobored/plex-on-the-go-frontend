import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {IError} from 'protractor/built/exitCodes';
import 'rxjs/add/operator/map'
import {Subscriber} from 'rxjs/Subscriber';
import {SearchRequest} from '../../../shared/models/search/searchRequest';
import {environment} from '../../../../environments/properties';
import {Media} from '../../../shared/models/media/media';
import {PlexUser} from '../../../shared/models/plexusers/plexuser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TvShowsRestService {

  constructor(private http: HttpClient) {}

  private tvshowsUrl = environment.apiUrl + '/tvshows';
  private listTvShowsUrl = environment.apiUrl + '/tvshows/list';
  private searchUrl = environment.apiUrl + '/tvshows/search';

  private addTvShow = environment.apiUrl + '/conversions/add';


  public getTvShows() {
    return this.http.get(this.tvshowsUrl);
  }

  public getTvShowsList() {
    return this.http.get(this.listTvShowsUrl);
  }

  public searchTvShows(search: SearchRequest){
    return this.http.post(this.searchUrl, search, httpOptions);
  }

  public addConversion(media: Media){
    return this.http.post(this.addTvShow, media, httpOptions);
  }
}
