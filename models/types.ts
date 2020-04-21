import { COOKIE_NAME } from 'utils/appConstants';

export interface Drink {
  ingredients: Ingredient[],
  name: string,
  description: string,
}

export interface Ingredient {
  name: string,
  unit: number, // Units enum below
  amount: string, // needs to be a string to support something like 3/4
  isNew?: boolean,
}

export interface CookieType {
  [COOKIE_NAME: string]: string;
}

export interface AppContextInterface {
  email: string;
  name: string;
  userId: number;
  cookie?: any;
}

export enum Units {
  Oz = 1,
  Cup,
  Gallon,
  Splash,
  Garnish,
};
