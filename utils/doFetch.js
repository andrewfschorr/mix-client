import unfetch from 'isomorphic-unfetch';
import https from 'https';

import { LOCAL_URL, API_URL, IS_DEV } from 'utils/appConstants';

const doFetch = function doFetchFn(
  endpoint,
  {
    headers = {},
    data = {},
    body = {},
    method = 'GET',
  } = {},
  callApiServer = false, // true if calling laravel back end
) {
  const apiAgentData = (IS_DEV && callApiServer) ? {
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  } : {};

  const reqData = {
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
  return unfetch(`${callApiServer ? API_URL : LOCAL_URL}/api${endpoint}`, reqData).catch(console.log);
};

export default doFetch;
