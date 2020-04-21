import unfetch from 'isomorphic-unfetch';
import https from 'https';

import { IS_DEV } from 'utils/appConstants';

const doFetch = function doFetchFn(
  endpoint,
  {
    headers = {},
    data = {},
    body = {},
    method = 'GET',
  } = {}
) {
  const apiAgentData = (IS_DEV) ? {
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  } : {};

  const reqData: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    ...{
      ...data,
      ...apiAgentData,
    },
  };

  if (method === 'POST' && Object.keys(body).length > 0) {
    reqData.headers['Content-Type'] = 'application/json';
  }

  if (Object.keys(body).length > 0 && method === 'POST') {
    reqData.body = JSON.stringify(body);
  }


  const url = IS_DEV ? 'https://mixapp.test' : 'https://topofshelf.com';

  return unfetch(`${url}/api${endpoint}`, reqData);
};

export default doFetch;
