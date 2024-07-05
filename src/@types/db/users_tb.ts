export interface User extends DbDefault {
  name: string;
  email: string;
  uuid: string;
  salt: string;
  token: string;
}
