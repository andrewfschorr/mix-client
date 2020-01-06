import Router from 'next/router';
import cookies from 'next-cookies';
import https from 'https';

import doFetch from 'utils/doFetch';
import { IS_DEV } from 'utils/appConstants';

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
  const { whiskyNeat } = cookies(ctx);
  if (whiskyNeat && ctx.res) {
    const data = IS_DEV ? {
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    } : {};
    const headers = {
      Authorization: `Bearer ${whiskyNeat}`,
    };
    const userInfoResponse = await doFetch({
      endpoint: '/me',
      headers,
      data,
    });
    if (ctx.res && userInfoResponse.status === 200) {
      redirect(ctx, '/');
      return true;
    }
  }
  return false;
};
