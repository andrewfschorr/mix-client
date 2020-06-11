import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import makeRequest from 'utils/makeRequest';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import { COOKIE_NAME } from 'utils/appConstants';
import cookies from 'next-cookies';
import Link from 'next/link';

const TagPage = ({ userInfo, tag }) => {
  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          </div>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
};


TagPage.getInitialProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;
  const jwt = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(jwt);
  const tagResponse = await makeRequest(`/tag/${id}`);
  let tag;
  if (tagResponse.status !== 200) {
    console.warn('Could not find your tag');
    // TODO have an "cant find this specific tag" message
  } else {
    tag = await tagResponse.json();
  }
  return {
    userInfo,
    tag,
  };
};

export default TagPage;
