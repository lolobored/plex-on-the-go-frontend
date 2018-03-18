export class User {

  id: number;
  userName: string;
  password: string;
  role: string;
  plexLogin: string;
  plexPassword: string;
  plexToken: string;
  plexTokenValidated: boolean;

  constructor() {
    this.id = 0;
    this.plexToken = '';
    this.plexTokenValidated = false;
  }
}
