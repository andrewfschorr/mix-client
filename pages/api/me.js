import https from 'https';
import unfetch from 'isomorphic-unfetch';
import { API_URL, IS_DEV, COOKIE_NAME } from 'utils/appConstants';

export default async (req, res) => {
  const cookies = req.cookies;
  const authToken = cookies[COOKIE_NAME];

  if (typeof authToken === 'undefined') {
    res.status(401).json('Not authorized');
  }

  const data = IS_DEV ? {
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  } : {};
  const resp = await unfetch(`${API_URL}/api/me`, {
    headers: {
      // 'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    ...data,
  }).catch(e => {
    console.log(e);
  })
  if (resp.status === 200) {
    res.status(200).json(await resp.json());
  } else {
    console.log(resp);
    res.status(resp.status).json(resp.statusText);
  }
};
