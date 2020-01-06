import unfetch from 'isomorphic-unfetch';
import https from 'https';
import { API_URL, IS_DEV, COOKIE_NAME } from 'utils/appConstants';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, description } = req.body;
    const cookies = req.cookies;
    const authToken = cookies[COOKIE_NAME];
    console.log(name, description);
    if (typeof authToken === 'undefined') {
      res.status(401).json('Not authorized');
    }
    const data = IS_DEV ? {
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
    } : {};

    const resp = await unfetch(`${API_URL}/api/drink`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
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
