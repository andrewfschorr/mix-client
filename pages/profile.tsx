import makeRequest from 'utils/makeRequest';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import { redirect } from 'utils/requestHelpers';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';
import { COOKIE_NAME } from 'utils/appConstants';
// import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';


function Profile({ userInfo, pathname}) {
  const { email } = userInfo;
  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton>
        <div className={`w-full main p-6 container mx-auto`}>
          { email }
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Profile.getInitialProps = async ctx => {
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
  }
};

export default Profile;
