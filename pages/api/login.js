import unfetch from 'isomorphic-unfetch';
import https from 'https';
import { API_URL, IS_DEV } from 'utils/appConstants';

export default async (req, res) => {
  const data = IS_DEV ? {
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  } : {};

  const { email, password } = req.body;

  const resp = await unfetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
    ...data,
  });
  if (resp.status === 200) {
    res.status(200).json(await resp.json());
  } else {
    res.status(resp.status).json(resp.statusText);
  }
};
