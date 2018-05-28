import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/models/user/user';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {IError} from 'protractor/built/exitCodes';
import 'rxjs/add/operator/map';
import {Subscriber} from 'rxjs/Subscriber';
import {environment} from '../../../../environments/properties';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  private usersUrl = environment.apiUrl + '/users';
  private usersSearchByNameUrl = environment.apiUrl + '/users/byname';

  public getUsers() {
    return this.http.get(this.usersUrl);
  }

  public getUser(id: number) {
    return this.http.get(this.usersUrl + '/' + id);
  }

  public getUserByUserName(userName: string) {
    return this.http.get(this.usersSearchByNameUrl + '/' + userName);
  }

  public deleteUser(user: User) {
    return this.http.delete(this.usersUrl + '/' + user.id);
  }

  public createUser(user: User) {
    return this.http.post(this.usersUrl, user, httpOptions);
  }

  public updateUser(user: User) {
    return this.http.put(this.usersUrl + '/' + user.id, user, httpOptions);
  }
}
