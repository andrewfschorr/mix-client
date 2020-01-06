import doFetch from 'utils/doFetch';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

export default async (req, res) => {
  const { name, description } = req.body;

  const response = await doFetch('/drink', {
    method: req.method,
    headers: turnAuthCookieIntoHeader(req.cookies),
    body: {
      name,
      description,
    },
  }, true);

  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    console.error(response);
    res.status(response.status).json(response.statusText);
  }
};
