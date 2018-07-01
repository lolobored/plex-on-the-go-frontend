import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/properties';
import {PlexUser} from '../../../shared/models/plexusers/plexuser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlexService {

  constructor(private http: HttpClient) {}

  private plexUrlLogin = environment.apiUrl + '/plex/login';

  public plexLogin(login: string, password: string) {
    const testUser = new PlexUser();
    testUser.username = login;
    testUser.password = password;
    return this.http.post(this.plexUrlLogin, testUser, httpOptions);
  }
}
