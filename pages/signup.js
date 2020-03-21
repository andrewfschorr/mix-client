import 'styles/global.css';

import Router from 'next/router';
import { useState } from 'react';

import Skeleton from 'common/Skeleton';
import doFetch from 'utils/doFetch';
import setCookie from 'utils/setCookie';
import { COOKIE_NAME, IS_DEV } from 'utils/appConstants';
import { redirectIfLoggedIn } from 'utils/requestHelpers';

const signup = async (e, email, password, passwordVerify, toggleHasError) => {
  e.preventDefault();
  if (password !== passwordVerify) {
    toggleHasError('Oops, passwords don\'t seem to match');
    return;
  }
  const resp = await doFetch('/signup', {
    method: 'POST',
    body: {
      email,
      password,
    },
  });

  if (resp.status === 200) {
    const data = await resp.json();
    setCookie({ [COOKIE_NAME]: data.access_token });
    Router.push('/');
  } else {
    if (resp.status === 409) {
      toggleHasError('Sorry, that email already has an account');
    } else {
      toggleHasError('Oops, something didn\'t work');
    }
  }
};

const Login = ({ pathname }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [hasError, toggleHasError] = useState(false);

  return (
    <Skeleton pathname={pathname}>
      <div className="w-full justify-center items-center flex main">
        <form
          onSubmit={e => signup(e, email, password, passwordVerify, toggleHasError)}
          className="bg-white border-solid border-2 border-gray-600 rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="andrew@mixapp.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accessCode">
              Access Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accessCode"
              type="text"
              placeholder=""
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordVerify">
              Retype Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password-verify"
              type="password"
              placeholder=""
              value={passwordVerify}
              onChange={e => setPasswordVerify(e.target.value)}
            />
            {hasError ? <p className="text-red-500 text-xs italic">{hasError}</p> : null}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={e => signup(e, email, password, passwordVerify, toggleHasError)}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </Skeleton>
  );
};

Login.getInitialProps = async function (ctx) {
  if (!IS_DEV) {
    const hasRedirected = await redirectIfLoggedIn(ctx);
    if (hasRedirected) return {};
  }
  const { pathname } = ctx;
  return {
    pathname,
  };
};

export default Login;
