import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import doFetch from 'utils/doFetch';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import { COOKIE_NAME } from 'utils/appConstants';
import cookies from 'next-cookies';

const AddAdrink = ({ pathname, userInfo, drink}) => {
  console.log(drink);
  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          {JSON.stringify(drink)}
        </div>
      </Skeleton>
      </AppContext.Provider>
  )
};

AddAdrink.getInitialProps = async (ctx) => {
  const { query: { id } } = ctx;
  const jwt = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(jwt);
  const drinkResponse = await doFetch(`/drink/${id}`);
  let drink;
  if (drinkResponse.status !== 200) {
    console.warn('Could not find your drink');
    // TODO have an "cant find this specific drink" message
  } else {
    drink = await drinkResponse.json();
  }
  return {
    drink,
    userInfo,
  };
};

export default AddAdrink;

