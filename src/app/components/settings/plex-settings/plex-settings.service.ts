import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../../environments/properties';
import {PlexUser} from '../../../shared/models/plexusers/plexuser';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlexUserService {

  private plexGetUserDetails = environment.apiUrl + '/plex/fetch';
  private plexSaveUsers = environment.apiUrl + '/plex/save';
  private plexGetUsers = environment.apiUrl + '/plex';
  private plexDelete = environment.apiUrl + '/plex';

  constructor(private http: HttpClient) {}

  public login(plexUser: PlexUser): boolean {
    return true;
  }

  public getPlexUserDetails(plexUser: PlexUser) {
    return this.http.post(this.plexGetUserDetails, plexUser, httpOptions);
  }

  public saveUsers(plexUser: PlexUser) {
    return this.http.post(this.plexSaveUsers, plexUser, httpOptions);
  }

  public delete(userId: string) {
    return this.http.delete(this.plexDelete + '/' + userId);
  }

  public getUsers() {
    return this.http.get(this.plexGetUsers);
  }
}
