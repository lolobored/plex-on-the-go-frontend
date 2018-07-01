import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {IError} from 'protractor/built/exitCodes';
import 'rxjs/add/operator/map'
import {Subscriber} from 'rxjs/Subscriber';
import {Search} from '../../../shared/models/search/search';
import {environment} from '../../../../environments/properties';
import {Media} from '../../../shared/models/media/media';
import {PlexUser} from '../../../shared/models/plexusers/plexuser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MoviesRestService {

  constructor(private http: HttpClient) {}

  private moviesUrl = environment.apiUrl + '/movies';
  private genreUrl = environment.apiUrl + '/movies/genre';
  private yearUrl = environment.apiUrl + '/movies/year';
  private searchUrl = environment.apiUrl + '/movies/search';

  private addMovie = environment.apiUrl + '/conversions/add';


  public getMovies() {
    return this.http.get(this.moviesUrl);
  }

  public getGenre() {
    return this.http.get(this.genreUrl);
  }

  public getYears() {
    return this.http.get(this.yearUrl);
  }

  public searchMovies(search: Search){
    return this.http.post(this.searchUrl, search, httpOptions);
  }

  public addConversion(media: Media){
    return this.http.post(this.addMovie, media, httpOptions);
  }
}
