import doFetch from 'utils/doFetch.js';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import protectedRoute from 'utils/protectedRoute';
import IngredientList from 'components/IngredientList';
import { RouteType } from 'models/types';
import { redirect } from 'utils/requestHelpers';
import { COOKIE_NAME } from 'utils/appConstants';

function Index({ pathname, email }) {
  return (
    <AppContext.Provider value={{ email }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          <h1 className="mb-2">Add Drink</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="mb-2">Drink Name</h3>
              <input
                className="w-full border rounded py-2 px-3 mb-2"
                id="grid-first-name"
                type="text"
                placeholder="Drink Name"
              />
              <h3 className="mb-2">Drink Description</h3>
              <textarea
                name=""
                id=""
                cols={15}
                className="w-full border rounded py-2 px-3"
              ></textarea>
            </div>
            <div className="md:col-span-4">
              <div className="rounded bg-gray-400 px-8 py-4">
                <h2>Drink Image</h2>

                <div className="bg-white rounded my-3 p-3">
                  <img src="/default-drink.png" alt="" />
                </div>

                <a href="#">Upload Image</a>
              </div>
            </div>
          </div>
          <div>
            <h2>Ingredients</h2>
            <IngredientList />
          </div>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Index.getInitialProps = async (ctx) => {
  const isLoggedIn = protectedRoute(RouteType.LoggedIn, cookies(ctx));
  if (!isLoggedIn) {
    return redirect(ctx, '/login');
  }

  const authToken = cookies(ctx)[COOKIE_NAME];
  const additionalHeaders = ctx.req
    ? {
        cookie: `${COOKIE_NAME}=${authToken}`,
      }
    : {};
  const userInfoResponse = await doFetch('/me', {
    headers: {
      ...additionalHeaders,
    },
  });
  if (userInfoResponse.status !== 200) {
    redirect(ctx, '/login');
  }
  const user = await userInfoResponse.json();
  const { email } = user;
  return { email };
};

export default Index;
