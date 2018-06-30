import {KeycloakService} from 'keycloak-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class UserServiceAuth {

  constructor(private keycloakService: KeycloakService) {
  }

  getUsername(): string{
    return this.keycloakService.getUsername();
  }

  isAdmin(): boolean {
    return this.keycloakService.getUserRoles().indexOf('admin') !== -1;
  }
}
