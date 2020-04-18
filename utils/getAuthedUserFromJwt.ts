import cookies from 'next-cookies';
import jwtDecode from 'jwt-decode';
import { AppContextInterface } from 'models/types';

export default function getAuthedUserFromJwt(jwt: string): AppContextInterface | null {
  if (!jwt) {
    return null
  }
  const { email, userId, name } = jwtDecode(jwt);
  return {
    email,
    userId,
    name,
  };
}
