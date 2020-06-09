import unfetch from 'isomorphic-unfetch';
import https from 'https';

import { API_URL, IS_DEV } from 'utils/appConstants';

const APPLICATION_JSON = 'application/json';

const appendFormData = (body) => {
  console.log(body);
  const formData  = new FormData();
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      const val = body[key];
      if (key === 'image') {
        formData.append(key, val.file);
      } else if (typeof val === 'object' && val !== null) {
        formData.append(key, JSON.stringify(val));
      } else {
        formData.append(key, val);
      }
    }
  }
  return formData;
}

export default function(
  endpoint,
  {
    headers = {},
    data = {},
    body = {},
    method = 'GET',
    type = APPLICATION_JSON,
    accept = APPLICATION_JSON,
  } = {}
) {
  const apiAgentData = (IS_DEV) ? {
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  } : {};
  // console.log(type);
  const reqData: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      ...headers,
    },
    ...{
      ...data,
      ...apiAgentData,
    },
  };

  if (Object.keys(body).length > 0 && method === 'POST' && type !== 'formData') {
    reqData.body = JSON.stringify(body);
  }

  if (type === 'formData') {
    reqData.body = appendFormData(body);
  // if type === formData we HAVE to let the browser set this itself
  } else {
    reqData.headers['Content-type'] = type;
    reqData.headers['Accept'] = accept;
  }

  // const url = IS_DEV ? 'https://mixapp.test' : 'https://topofshelf.com';
  return unfetch(`${API_URL}/api${endpoint}`, reqData);
};
