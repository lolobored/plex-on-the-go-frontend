import {PlexUser} from '../plexusers/plexuser';

export class User {

  id: string;
  userName: string;
  password: string;
  homeDirectory: string;
  ownership: string;
  admin: boolean;
  plexUser: PlexUser;

}
