// import Router from 'next/router';
// import { useState } from 'react';
import Skeleton from 'common/Skeleton';
import makeRequest from 'utils/makeRequest';
// import setCookie from 'js-cookie';
// import { COOKIE_NAME } from 'utils/appConstants';
// import { redirect } from 'utils/requestHelpers';
// import cookies from 'next-cookies';
// import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt.ts';

const FacebookLogin = ({ pathname }) => {
  const hello = 'hi';
  return (
    <Skeleton pathname={pathname}>
      { hello }
    </Skeleton>
  );
};

FacebookLogin.getInitialProps = async function (ctx) {
  const { pathname, query } = ctx;
  const { code } = query;
  const resp = await makeRequest(`/login/facebook/callback?code=${code}`);

  if (resp.status === 200) {
    const data = await resp.json();
    console.log(data);
  }
  return { pathname };
};

export default FacebookLogin;
