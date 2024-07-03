export interface User extends DbDefault {
  name: string;
  uuid: string;
  salt: string;
  token: string;
}
