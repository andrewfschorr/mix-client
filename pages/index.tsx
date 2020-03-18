import 'styles/global.css';
import doFetch from 'utils/doFetch.js';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import protectedRoute from 'utils/protectedRoute';
import DrinkList from 'components/DrinkList';
import { useState } from 'react';
import { RouteType } from 'models/types';
import { redirect } from 'utils/requestHelpers';
import { COOKIE_NAME } from 'utils/appConstants';

async function submitDrink(e, drinkName, drinkDescription) {
  if (drinkName.trim() === '' || drinkDescription === '') return;
  e.preventDefault();
  const drinkResponse = await doFetch('/drink', {
    method: 'POST',
    body: {
      name: drinkName,
      description: drinkDescription
    }
  });
}

function Index({ pathname, user, drinks }) {
  const [drinkName, setDrinkName] = useState('');
  const [drinkDescription, setDrinkDescripton] = useState('');
  const { name, email } = user;
  return (
    <AppContext.Provider value={{ name, email }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main p-6">
          <h2>{`Hello ${user.email}`}</h2>
          <DrinkList drinks={drinks} />
        </div>
        <div className="p-6 m-6 bg-gray-200 border-purple-700">
          <h3 className="pb-3">Add drink</h3>
          <form>
            <input
              placeholder="drink name"
              type="text"
              value={drinkName}
              onChange={e => setDrinkName(e.target.value)}
            />
            <br />
            <textarea
              placeholder="description"
              className="w-full mt-4"
              name=""
              id=""
              rows={3}
              value={drinkDescription}
              onChange={e => setDrinkDescripton(e.target.value)}
            ></textarea>
            <br />
            <button
              className="mt-4 border-2 border-blue-500 "
              type="submit"
              onClick={e => submitDrink(e, drinkName, drinkDescription)}
            >
              Submit
            </button>
          </form>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Index.getInitialProps = async ctx => {
  const isLoggedIn = protectedRoute(RouteType.LoggedIn, cookies(ctx));
  if (!isLoggedIn) {
    return redirect(ctx, '/login');
  }

  // TODO do i need to deal with requests from the clinet in any specific way?
  const authToken = cookies(ctx)[COOKIE_NAME];
  const additionalHeaders = ctx.req
    ? {
        cookie: `${COOKIE_NAME}=${authToken}`
      }
    : {};
  const userInfoResponse = await doFetch('/me', {
    headers: {
      ...additionalHeaders
    }
  });
  if (userInfoResponse.status !== 200) {
    redirect(ctx, '/login');
  }
  const user = await userInfoResponse.json();
  const { name, email, drinks } = user;
  return {
    user: {
      name,
      email
    },
    drinks
  };
};

export default Index;
