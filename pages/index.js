import 'styles/global.css';
import { useState } from 'react';
import doFetch from 'utils/doFetch';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import { redirect } from 'utils/requestHelpers';
import { COOKIE_NAME } from 'utils/appConstants';

async function submitDrink(e, drinkName, drinkDescription) {
  if (drinkName.trim() === '' || drinkDescription === '') return;
  e.preventDefault();
  const drinkResponse = await doFetch('/drink', {
    method: 'POST',
    body: {
      name: drinkName,
      description: drinkDescription,
    },
  });
}

function Index({ pathname, userInfo }) {
  const [drinkName, setDrinkName] = useState('');
  const [drinkDescription, setDrinkDescripton] = useState('');

  return (
    <AppContext.Provider value={{ userInfo }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main p-6">
          <h2>{`Hello ${userInfo.email}`}</h2>
        </div>
        <div className="p-6 m-6 bg-gray-200 border-purple-700">
          <h3 className="pb-3">Add drink</h3>
          <form>
            <input placeholder="drink name" type="text" value={drinkName} onChange={e => setDrinkName(e.target.value)} />
            <br/>
            <textarea placeholder="description" className="w-full mt-4" name="" id="" rows="3" value={drinkDescription} onChange={e => setDrinkDescripton(e.target.value)}></textarea>
            <br/>
            <button className="mt-4 border-2 border-blue-500 " type="submit" onClick={(e) => submitDrink(e, drinkName, drinkDescription)}>Submit</button>
          </form>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Index.getInitialProps = async (ctx) => {
  const cooks = cookies(ctx);
  const authToken = cooks[COOKIE_NAME];

  if (typeof authToken === 'undefined') {
    redirect(ctx, '/login');
    return;
  }

  // TODO do i need to deal with requests from the clinet in any specific way?
  const additionalHeaders = ctx.req ? {
    cookie: `${COOKIE_NAME}=${authToken}`,
  } : {};
  const userInfoResponse = await doFetch('/me', {
    headers: {
      ...additionalHeaders,
    },
  });

  if (userInfoResponse.status !== 200) {
    redirect(ctx, '/login');
  }
  const userInfo = await userInfoResponse.json();
  return { userInfo };
};

export default Index;
