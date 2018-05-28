import { KeycloakService } from 'keycloak-angular';
import {environment} from '../../environments/properties';


export function initializer(keycloak: KeycloakService): () => Promise<any> {

  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloakUrl + '/auth',
            realm: 'plex', // .ie: master
            clientId: 'plex-frontend' // .ie: account
          },
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
