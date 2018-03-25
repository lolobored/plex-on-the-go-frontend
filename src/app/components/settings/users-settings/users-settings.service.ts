import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../shared/models/user/user';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {IError} from 'protractor/built/exitCodes';
import 'rxjs/add/operator/map';
import {Subscriber} from 'rxjs/Subscriber';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  private usersUrl = 'http://lolobored.synology.me:8888/users';
  private usersSearchByNameUrl = 'http://lolobored.synology.me:8888/users/byname';

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
