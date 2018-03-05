import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MoviesService {

  constructor(private http:HttpClient) {}

  private moviesUrl = 'http://localhost:8080/movies';

  public getMovies() : Observable<any>{
    return this.http.get(this.moviesUrl);
  }

}
