import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {environment} from '../../../environments/properties';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConversionsRestService {

  constructor(private http: HttpClient) {}

  private conversionsUrl = environment.apiUrl + '/conversions';

  public getConversions(user: string) {
    return this.http.post(this.conversionsUrl, user, httpOptions);
  }
}
