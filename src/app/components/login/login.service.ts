import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {UserComponent} from "./user/user.component";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) {}

  private loginUrl = 'http://backend:8888/login';

  public login(user:UserComponent) : Observable<any>{
    return this.http.post(this.loginUrl,  user , {headers: { 'Content-Type': 'application/json' }});
  }

}
