export interface User extends DbDefault {
  username: string,
  name: string;
  email: string;
  uuid: string;
  salt: string;
  token: string;
}
