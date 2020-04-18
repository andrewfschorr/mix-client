import Router from 'next/router';
// import cookies from 'next-cookies';
// import doFetch from 'utils/doFetch';
import { COOKIE_NAME } from 'utils/appConstants';

export const turnAuthCookieIntoHeader = function (cookies) {
  const jwtToken = cookies[COOKIE_NAME];
  return {
    Authorization: `Bearer ${jwtToken}`,
  };
};

export const redirect = ({ res, req }, location) => {
  if (res) {
    res.writeHead(302, {
      Location: location || '/',
    });
    res.end();
  } else {
    Router.push(location || '/');
  }
  return {};
};

export const getAuthHeader = (jwt) => {
  return {
    headers: {
      cookie: `${COOKIE_NAME}=${jwt}`,
    },
  };
};

// export const redirectIfLoggedIn = async (ctx) => {
//   const cooks = cookies(ctx);
//   const jwtToken = cooks[COOKIE_NAME];
//   if (typeof jwtToken === 'undefined') return false;
//   // TODO do i need to deal with requests from the clinet in any specific way?
//   const additionalHeaders = ctx.req ? {
//     cookie: `${COOKIE_NAME}=${jwtToken}`,
//   } : {};
//   const userInfoResponse = await doFetch('/me', {
//     headers: {
//       ...additionalHeaders,
//     },
//   });
//   if (userInfoResponse.status === 200) {
//     redirect(ctx, '/');
//     return true;
//   }
//   return false;
// };
