import Router from 'next/router';
import cookies from 'next-cookies';

import doFetch from 'utils/doFetch';
import { COOKIE_NAME } from 'utils/appConstants';

export const turnAuthCookieIntoHeader = function(cookies) {
  const authToken = cookies[COOKIE_NAME];
  return {
    Authorization: `Bearer ${authToken}`,
  };
};

export const redirect = ({ res }, location) => {
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

export const redirectIfLoggedIn = async (ctx) => {
  const cooks = cookies(ctx);
  const authToken = cooks[COOKIE_NAME];

  // TODO do i need to deal with requests from the clinet in any specific way?
  const additionalHeaders = ctx.req ? {
    cookie: `${COOKIE_NAME}=${authToken}`,
  } : {};
  const userInfoResponse = await doFetch('/me', {
    headers: {
      ...additionalHeaders,
    },
  });
  if (userInfoResponse.status === 200) {
    redirect(ctx, '/');
    return true;
  }
  return false;
};
