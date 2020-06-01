import makeRequest from 'utils/makeRequest';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import AppContext from 'utils/AppContext';
import { AppContextInterface } from 'models/types';
import DrinkSearch from 'components/DrinkSearch';
import { useState } from 'react';
import { COOKIE_NAME } from 'utils/appConstants';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';

// import styles from './foo.module.css';

async function removeFromShelf(id: number, updateUserDrinks: any) { // TODO update any
  // I DONT HTNK THIS WORKS, havent tested
  makeRequest(`/shelf/${id}`, {
    method: 'DELETE',
	}).then(resp => resp.json()).then((resp) => {
		const { drinkRemoved } = resp;
		updateUserDrinks((drinks) => {
			return drinks.filter((drink) => drink.id !== drinkRemoved);
		});
	});

}

function Index({ pathname, userInfo, cookie, drinks }) {
  // const [drinkToAddName, setDrinkToAddName] = useState('');
  // const [drinkDescription, setDrinkDescripton] = useState('');
	const [userDrinks, updateUserDrinks] = useState(drinks);
  // const { email } = user;
  return (
    <AppContext.Provider value={{ ...userInfo, cookie }}>
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
  const cookie = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(cookie);
  return {
    cookie,
    ...(userInfo ? { userInfo } : {}),
  }
};

export default Index;
