import doFetch from 'utils/doFetch';
import { COOKIE_NAME } from 'utils/appConstants';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

export default async (req, res) => {
  if (typeof req.cookies[COOKIE_NAME] === 'undefined') {
    res.status(401).json('Not authorized');
  }
  const response = await doFetch('/me', {
    headers: turnAuthCookieIntoHeader(req.cookies),
  }, true);

  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json(response.statusText);
  }
};
