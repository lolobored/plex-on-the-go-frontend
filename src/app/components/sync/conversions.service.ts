import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/properties';
import {User} from '../../shared/models/user/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConversionsService {

  constructor(private http: HttpClient) {}

  private conversionsUrl = environment.apiUrl + '/conversions';

  public getConversions(user: string) {
    return this.http.post(this.conversionsUrl, httpOptions);
  }
}
