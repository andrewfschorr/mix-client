import { COOKIE_NAME } from 'utils/appConstants';

export enum RouteType {
  LoggedIn,
  LoggedOut
}

export interface CookieType {
  [COOKIE_NAME: string]: string;
}

export interface AppContextInterface {
  // name: string; this is never used
  email: string;
}
