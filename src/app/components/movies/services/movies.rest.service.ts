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

  private moviesUrl = 'http://localhost:8080/movies';
  private genreUrl = 'http://localhost:8080/movies/genre';
  private yearUrl = 'http://localhost:8080/movies/year';
  private searchUrl = 'http://localhost:8080/movies/search';

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
}
