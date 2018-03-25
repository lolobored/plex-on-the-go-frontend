import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {IError} from 'protractor/built/exitCodes';
import 'rxjs/add/operator/map'
import {Subscriber} from 'rxjs/Subscriber';
import {Search} from '../../../shared/models/search/search';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MoviesRestService {

  constructor(private http: HttpClient) {}

  private moviesUrl = 'http://lolobored.synology.me:8888/movies';
  private genreUrl = 'http://lolobored.synology.me:8888/movies/genre';
  private yearUrl = 'http://lolobored.synology.me:8888/movies/year';
  private searchUrl = 'http://lolobored.synology.me:8888/movies/search';

  public getMovies(user: string) {
    return this.http.post(this.moviesUrl, user, httpOptions);
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
}
