import cookies from 'next-cookies';
import { RouteType, CookieType } from 'models/types';
import { COOKIE_NAME } from 'utils/appConstants';

const protectedRoute = (routeType: RouteType, cookies: CookieType): boolean => {
  if (routeType === RouteType.LoggedIn) {
    return typeof cookies[COOKIE_NAME] === 'string';
  }
  return false;
};

export default protectedRoute;
