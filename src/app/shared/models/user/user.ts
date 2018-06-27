export class User {

  id: string;
  userName: string;
  password: string;
  plexLogin: string;
  plexPassword: string;
  plexToken: string;
  plexTokenValidated: boolean;
  homeDirectory: string;
  ownership: string;
  admin: boolean;

  constructor() {
    this.plexToken = '';
    this.plexTokenValidated = false;
  }
}
