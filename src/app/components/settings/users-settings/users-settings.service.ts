import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/models/user';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {IError} from 'protractor/built/exitCodes';
import 'rxjs/add/operator/map'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  private usersUrl = 'http://localhost:8080/users';

  public getUsers() {
    console.log(this.http.get(this.usersUrl));
    return this.http.get(this.usersUrl);
  }

  public getUser(id: number){
    return this.http.get(this.usersUrl + '/' + id);
  }

  public deleteUser(user: User) {
    return this.http.delete(this.usersUrl + '/' + user.id);
  }

  public createUser(user: User) {
    this.http.post(this.usersUrl, user, httpOptions).subscribe();
  }

  public updateUser(user: User) {
    this.http.put(this.usersUrl + '/' + user.id, user, httpOptions).subscribe();
  }
}
