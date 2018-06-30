import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/properties';
import {User} from '../../../shared/models/user/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlexService {

  constructor(private http: HttpClient) {}

  private plexUrlLogin = environment.apiUrl + '/plex/login';

  public plexLogin(login: string, password: string) {
    const testUser = new User();
    testUser.plexLogin = login;
    testUser.plexPassword = password;
    return this.http.post(this.plexUrlLogin, testUser, httpOptions);
  }
}
