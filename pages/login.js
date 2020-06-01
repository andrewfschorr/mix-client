import { useState } from 'react';
import makeRequest from 'utils/makeRequest.ts';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from 'utils/appConstants';
import Skeleton from 'common/Skeleton';
import { redirect } from 'utils/requestHelpers';
import cookies from 'next-cookies';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt.ts';

const logUserIn = async (e, email, password, toggleHasError) => {
  e.preventDefault();
  if (email.trim() === '' || password.trim() === '') return;
  const resp = await makeRequest('/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  });
  if (resp.status === 200) {
    const data = await resp.json();
    Cookies.set(COOKIE_NAME, data.access_token, { expires: 3650 });
    redirect({}, '/');
  } else {
    toggleHasError(true);
  }
};

const Login = ({ pathname }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, toggleHasError] = useState(false);
  return (
    <Skeleton pathname={pathname}>
      <div className="w-full justify-center items-center flex main">
        <form
          onSubmit={e => logUserIn(e, email, password, toggleHasError)}
          className="bg-white border-solid border-2 border-gray-600 rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="andrew@mixapp.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder=""
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {hasError
              ? <p className="text-red-500 text-xs italic">{'Oops, something didn\'t work.'}</p>
              : null}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={e => logUserIn(e, email, password, toggleHasError)}>
              Log In
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"
              onClick={() => {console.log('TODO')}}
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
      </div>
    </Skeleton>
  );
};

Login.getInitialProps = function f(ctx) {
  const jwt = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(jwt);
  if (userInfo) {
    redirect(ctx, '/');
    return {};
  }
  const { pathname } = ctx;
  return { pathname };
};

export default Login;
