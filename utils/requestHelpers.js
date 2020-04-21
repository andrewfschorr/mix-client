import Router from 'next/router';
// import cookies from 'next-cookies';
// import doFetch from 'utils/doFetch';
// import { COOKIE_NAME } from 'utils/appConstants';

export const turnAuthCookieIntoHeader = (jwtCookie) => {
  return {
    Authorization: `Bearer ${jwtCookie}`,
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

// export const getAuthHeader = (jwt) => {
//   return {
//     headers: {
//       cookie: `${COOKIE_NAME}=${jwt}`,
//     },
//   };
// };


// // https://stackoverflow.com/questions/10730362/get-cookie-by-name
// // god i hope this isnt wrong
// export const getCookie = (name) => {
//   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//   if (match) return match[2];
//   return false;
// };

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
