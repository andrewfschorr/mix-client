import doFetch from 'utils/doFetch';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

export default async (req, res) => {
  if (req.method !== 'POST') {
    throw new Error(`${req.method} not supported for /drink`);
  }
  const { name, description, ingredients } = req.body;
  const response = await doFetch('/drink', {
    method: 'POST',
    headers: turnAuthCookieIntoHeader(req.cookies),
    body: {
      name,
      description,
      ingredients,
    },
  }, true);

  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json(response.statusText);
  }
};
