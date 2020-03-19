import doFetch from 'utils/doFetch';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    throw new Error(`${req.method} not supported for /drink`);
  }
  const {
    query: { id },
  } = req;
  // res.end(`Post: ${id}`)
  const response = await doFetch(`/drink/${id}`, {
    method: 'DELETE',
    headers: turnAuthCookieIntoHeader(req.cookies),
  }, true);
  console.log(response);
  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json(response.statusText);
  }
};
