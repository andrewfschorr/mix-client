import unfetch from 'isomorphic-unfetch';
import https from 'https';
import { API_URL, IS_DEV } from 'utils/appConstants';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const data = IS_DEV ? {
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    } : {};

    const resp = await unfetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
      console.log(resp);
      res.status(resp.status).json(resp.statusText);
    }
  }
};
