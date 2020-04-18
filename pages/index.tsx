import doFetch from 'utils/doFetch.js';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import DrinkSearch from 'components/DrinkSearch';
import { useState } from 'react';
import { COOKIE_NAME } from 'utils/appConstants';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';

// import styles from './foo.module.css';

async function removeFromShelf(id: number, updateUserDrinks: any) { // TODO update any
	doFetch(`/shelf/${id}`, {
    method: 'DELETE',
	}).then(resp => resp.json()).then((resp) => {
		const { drinkRemoved } = resp;
		updateUserDrinks((drinks) => {
			return drinks.filter((drink) => drink.id !== drinkRemoved);
		});
	});

}

function Index({ pathname, userInfo, drinks }) {
  console.log({...userInfo});
  // const [drinkToAddName, setDrinkToAddName] = useState('');
	// const [drinkDescription, setDrinkDescripton] = useState('');
	const [userDrinks, updateUserDrinks] = useState(drinks);
  // const { email } = user;
  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton pathname={pathname}>
        <div className={`w-full main p-6 container mx-auto`}>
          <DrinkSearch
						removeDrinkCb={removeFromShelf}
						drinks={userDrinks}
						updateUserDrinks={updateUserDrinks}
					/>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Index.getInitialProps = async ctx => {
  const jwt = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(jwt);
  if (!userInfo) {
    return {};
  }
  // const userInfoResponse = await doFetch(
  //   '/me',
  //   // we only need to put the cookie header if its a serverside call, else its sent
  //   (ctx.req ? getAuthHeader(jwt) : {}),
  // );
  // console.log(userInfoResponse);
  // if (userInfoResponse.status === 200) console.log(await userInfoResponse.json());
  // if (userInfoResponse.status !== 200) {
  //   redirect(ctx, '/login');
  // }
  return {
    userInfo,
  }
};

export default Index;
