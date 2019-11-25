import fetch from 'isomorphic-unfetch';

import { API_URL } from 'utils/appConstants';

const defaultBody = {};

const doFetch = function doFetchFn(
  endpoint,
  additionalHeaders = {},
  method = 'GET',
  body = defaultBody,
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
  };

  if (body !== defaultBody && method !== 'GET') {
    data = {
      ...data,
      body: JSON.stringify(body),
    };
  }
  return fetch(`${API_URL}/${endpoint}`, data);
};

export default doFetch;
