import doFetch from 'utils/doFetch';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

export default async (req, res) => {
  const searchParams = new URLSearchParams(
    req.url.slice(req.url.lastIndexOf('?') + 1),
  );
  const queryParam = searchParams.get('q');
  const response = await doFetch(`/ingredients${queryParam ? `?q=${queryParam}` : ''}`, {
    method: req.method,
    headers: turnAuthCookieIntoHeader(req.cookies),
  }, true);

  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json(response.statusText);
  }
};
