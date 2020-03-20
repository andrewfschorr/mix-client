import doFetch from 'utils/doFetch';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

export default async (req, res) => {
  const { method } = req;

  if (method === 'DELETE' || method === 'POST') {
    const {
      query: { id },
    } = req;
    const response = await doFetch(`/drink/${id}`, {
      method,
      headers: turnAuthCookieIntoHeader(req.cookies),
    }, true);
    if (response.status === 200) {
      res.status(200).json(await response.json());
    } else {
      res.status(response.status).json(response.statusText);
    }
  } else {
    throw new Error(`${req.method} not supported for /drink/$`);
  }
};
