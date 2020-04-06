import { COOKIE_NAME } from 'utils/appConstants';

export interface Ingredient{
  ingredient: string,
  unit: number, // Units enum below
  amount: string,
}

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

export enum Units {
  Oz = 1,
  Cup,
  Gallon,
  Splash,
  Garnish,
};
