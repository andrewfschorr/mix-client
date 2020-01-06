import unfetch from 'isomorphic-unfetch';
import https from 'https';

import { LOCAL_URL, IS_DEV } from 'utils/appConstants';

const doFetch = function doFetchFn(endpoint, {
  headers = {},
  data = {},
  body = {},
  method = 'GET',
} = {}) {
  const reqData = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    ...data,
  };

  if (method !== 'GET') {
    // TODO Da fuq, cant have this with a GET ???
    reqData.headers['Content-Type'] = 'application/json';
  }

  if (Object.keys(body).length > 0 && method !== 'GET') {
    reqData.body = JSON.stringify(body);
  }

  return unfetch(`${LOCAL_URL}/api${endpoint}`, reqData);
};

export default doFetch;
