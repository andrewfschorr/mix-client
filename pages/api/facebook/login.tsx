import makeRequest from 'utils/makeRequest';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from 'utils/appConstants';
import { redirect } from 'utils/requestHelpers';
import { serialize } from 'cookie';

export default async (req, res) => {
  const { query: { code } } = req;
  const resp = await makeRequest(`/login/facebook/callback?code=${code}`);
  if (resp.status === 200) {
    const data = await resp.json();
    console.log(data);
    // Cookies.set(COOKIE_NAME, data.access_token, { expires: 3650 });
    res.setHeader('Set-Cookie', [
      serialize(COOKIE_NAME, data.access_token, {
        path: '/',
      }),
    ]);
    return redirect({req, res}, '/');
  }
  return resp;
}
