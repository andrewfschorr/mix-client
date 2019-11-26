import fetch from 'isomorphic-unfetch';

import { API_URL } from 'utils/appConstants';

const doFetch = function doFetchFn(
  endpoint,
  additionalHeaders = {},
  method = 'GET',
  additionalData = {},
  body = {},
) {
  const mergedHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };
  let data = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: mergedHeaders,
    ...additionalData,
  };

  if (Object.keys(body) > 0 && method !== 'GET') {
    data = {
      ...data,
      body: JSON.stringify(body),
    };
  }
  // return fetch(`${API_URL}${endpoint}`, data);
  return fetch(`${API_URL}${endpoint}`, data);
};

export default doFetch;
