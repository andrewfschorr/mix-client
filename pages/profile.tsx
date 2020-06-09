import makeRequest from 'utils/makeRequest';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import { redirect } from 'utils/requestHelpers';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';
import { COOKIE_NAME } from 'utils/appConstants';
// import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';

function Profile({ userInfo, pathname }) {
  const { email } = userInfo;

  const getUserInfo = () => {
    fetch('https://mixapp.test/api/me').then(console.log);
  }

  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton>
        <div className={`w-full main p-6 container mx-auto`}>
          <p>{email}</p>
          {/* <a
            href="#"
            className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={getUserInfo}
          >
            Get user Info
          </a> */}
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Profile.getInitialProps = async (ctx) => {
  const cookie = cookies(ctx)[COOKIE_NAME];
  // const userInfo = getAuthedUserFromJwt(cookie);
  const resp = await makeRequest('/me', {
    headers: turnAuthCookieIntoHeader(cookie),
  });
  const userInfo = await resp.json();
  if (resp.status !== 200) {
    return redirect(ctx, '/');
  }

  return {
    userInfo,
  };
};

export default Profile;
