import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import makeRequest from 'utils/makeRequest';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import { COOKIE_NAME } from 'utils/appConstants';
import { Ingredient, Units } from 'models/types';
import cookies from 'next-cookies';

const getContent = (drink) => {
  if (!drink) {
    return (
      <div className="col-span-12">
        <h2 className="mb-2 text-2xl">That drink doesn't exist</h2>
      </div>
    );
  }
  return (
    <>
      <div className="md:col-span-8">
        <h2 className="mb-2 text-2xl">{drink.name}</h2>
        <h3 className="text-xl">{drink.description}</h3>
        <h4 className="mt-4 mb-2 underline">Ingredients</h4>
        {drink.ingredients.length ? (
          <ul>
            {drink.ingredients.map((ingredient, i) => {
              return (
                <li key={i}>
                  {ingredient.amount} {Units[ingredient.unit]} &ndash;{' '}
                  {ingredient.name}
                </li>
              );
            })}
          </ul>
        ) : <p>Uh oh, missing instructions for {drink.name}</p>}
        <h4 className="mt-4 mb-2 underline">Instructions</h4>
        {drink.instructions.length ? (
          <ul className="list-inside list-disc">
            {drink.instructions.map((instruction, i) => {
              return (
                <li key={i}>{instruction}</li>
              );
            })}
          </ul>
        ) : <p>No instructions for {drink.instructions} 😕</p>}
      </div>
      <div className="md:col-span-4">
        <div className="rounded bg-gray-400 px-8 py-4">
          <div className="bg-white rounded my-3 p-3">
            <img
              src={drink.image ? drink.image : '/default-drink.png'}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

const AddDrink = ({ pathname, userInfo, drink }) => {
  return (
    <AppContext.Provider value={{ ...userInfo }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {getContent(drink)}
          </div>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
};

AddDrink.getInitialProps = async (ctx) => {
  const {
    query: { id },
  } = ctx;
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

export default AddDrink;
