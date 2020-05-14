import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import makeRequest from 'utils/makeRequest';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import { COOKIE_NAME } from 'utils/appConstants';
import cookies from 'next-cookies';

const AddAdrink = ({ pathname, userInfo, drink}) => {
  console.log(drink);
  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          {/* {JSON.stringify(drink)} */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="mb-2">Drink Name</h3>

            </div>
            <div className="md:col-span-4">
              <div className="rounded bg-gray-400 px-8 py-4">
                <div className="bg-white rounded my-3 p-3">
                  <img src="/default-drink.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Skeleton>
      </AppContext.Provider>
  )
};

AddAdrink.getInitialProps = async (ctx) => {
  const { query: { id } } = ctx;
  const jwt = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(jwt);
  const drinkResponse = await makeRequest(`/drink/${id}`);
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

