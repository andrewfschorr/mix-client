import Router from 'next/router';
import { useState } from 'react';
import Skeleton from 'common/Skeleton';
import makeRequest from 'utils/makeRequest.ts';
import jsCookie from 'js-cookie';
import { COOKIE_NAME } from 'utils/appConstants';
import { redirect } from 'utils/requestHelpers';
import cookies from 'next-cookies';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt.ts';

const signup = async (
  e,
  email,
  password,
  passwordVerify,
  accessCode,
  toggleHasError
) => {
  e.preventDefault();
  if (password !== passwordVerify) {
    toggleHasError("Oops, passwords don't seem to match");
    return;
  }
  const resp = await makeRequest('/signup', {
    method: 'POST',
    body: {
      email,
      password,
      accessCode,
    },
  });

  if (resp.status === 200) {
    const data = await resp.json();
    jsCookie.set(COOKIE_NAME, data.access_token, { expires: 3650 });
    Router.push('/');
  } else {
    if (resp.status === 409) {
      toggleHasError('Sorry, that email already has an account');
    } else {
      toggleHasError("Oops, something didn't work");
    }
  }
};

const Login = ({ pathname }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [hasError, toggleHasError] = useState(false);

  const [facebookAccessCode, setFacebookAccessCode] = useState('');

  return (
    <Skeleton pathname={pathname}>
      <div className="w-full justify-center items-center flex main">
        <div className="bg-white border-solid border-2 border-gray-600 rounded px-8 pt-6 pb-8 mb-4">
          <form
            onSubmit={(e) =>
              signup(e, email, password, passwordVerify, toggleHasError)
            }
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="accessCode"
              >
                Access Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="accessCode"
                type="password"
                placeholder=""
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordVerify"
              >
                Retype Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password-verify"
                type="password"
                placeholder=""
                value={passwordVerify}
                onChange={(e) => setPasswordVerify(e.target.value)}
              />
              {hasError ? (
                <p className="text-red-500 text-xs italic">{hasError}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={(e) =>
                  signup(
                    e,
                    email,
                    password,
                    passwordVerify,
                    accessCode,
                    toggleHasError
                  )
                }
              >
                Sign up
              </button>
            </div>
            <hr />

            {/* Facebook Login */}
            <h5>Log in with Facebook</h5>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="facebookAccessCode"
              >
                Access Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="facebookAccessCode"
                type="password"
                placeholder=""
                value={facebookAccessCode}
                onChange={(e) => setFacebookAccessCode(e.target.value)}
              />
            </div>
            <a
              className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              href="https://mixapp.test/api/login/facebook?accessCode=WHISKEY_NEAT"
              type="button"
            >
              login with facebook
            </a>
          </form>
        </div>
      </div>
    </Skeleton>
  );
};

Login.getInitialProps = async function (ctx) {
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
