import { useState } from 'react';
import doFetch from 'utils/doFetch.js';
import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import cookies from 'next-cookies';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import IngredientList from 'components/IngredientList';
import { AppContextInterface } from 'models/types';
import { COOKIE_NAME } from 'utils/appConstants';
import { Drink } from 'models/types';

function Index({ pathname, email }) {
  const [drinkToAdd, setDrinkToAdd] = useState<Drink>({
    name: '',
    description: '',
    ingredients: [],
  });

  // errors
  const [nameSubmissionError, setNameSubmissionError] = useState<boolean>(
    false
  );
  const [descriptionSubmissionError, setDescriptionSubmissionError] = useState<
    boolean
  >(false);
  const [ingredientSubmissionError, setIngredientSubmissionError] = useState<
    boolean
  >(false);

  return (
    <AppContext.Provider value={{ email }}>
      <Skeleton pathname={pathname}>
        <div className="w-full main py-6 container mx-auto px-4 md:px-0">
          <h1 className="mb-2">Add Drink</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            <div className="md:col-span-8">
              <h3 className="mb-2">Drink Name</h3>
              <input
                className={`w-full border rounded py-2 px-3 mb-2 ${
                  nameSubmissionError ? 'border-red-400' : ''
                }`}
                id="grid-first-name"
                type="text"
                placeholder="Drink Name"
                value={drinkToAdd.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setDrinkToAdd((drinkToAdd) => ({
                    ...drinkToAdd,
                    name,
                  }));
                }}
              />
              <h3 className="mb-2">Drink Description</h3>
              <textarea
                name=""
                id=""
                cols={15}
                className={`w-full border rounded py-2 px-3 ${
                  descriptionSubmissionError ? 'border-red-400' : ''
                }`}
                value={drinkToAdd.description}
                onChange={(e) => {
                  const description = e.target.value;
                  setDrinkToAdd((drinkToAdd) => ({
                    ...drinkToAdd,
                    description,
                  }));
                }}
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
            <IngredientList
              ingredientSubmissionError={ingredientSubmissionError}
              changeIngredients={(ingredients) => {
                if (ingredientSubmissionError && ingredients.length > 0) {
                  setIngredientSubmissionError(false);
                }
                setDrinkToAdd((drinkToAdd) => ({
                  ...drinkToAdd,
                  ingredients,
                }));
              }}
            />
          </div>
          <div>
            <button
              className="my-5 bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                const errors = [
                  [setNameSubmissionError, drinkToAdd.name],
                  [setDescriptionSubmissionError, drinkToAdd.description],
                  [setIngredientSubmissionError, drinkToAdd.ingredients.length],
                ] as const;

                let hasError = false;

                errors.forEach((e) => {
                  const [setErr, condition] = e;
                  if (!condition) {
                    setErr(true);
                  }
                });

                if (hasError) {
                  return;
                }

                const { ingredients, name, description } = drinkToAdd;
                doFetch('/drink', {
                  method: 'POST',
                  body: {
                    ingredients,
                    name,
                    description,
                  },
                }).then(resp => {
                  if (resp.status === 200) {
                    return resp.json();
                  }
                })
              }}
            >
              Add Drink!
            </button>
          </div>
        </div>
      </Skeleton>
    </AppContext.Provider>
  );
}

Index.getInitialProps = async (ctx) => {
  const jwt = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(jwt);
  if (!userInfo) {
    return {};
  }

  // const jwt = cookies(ctx)[COOKIE_NAME];
  // const additionalHeaders = ctx.req
  //   ? {
  //       cookie: `${COOKIE_NAME}=${jwt}`,
  //     }
  //   : {};
  // const userInfoResponse = await doFetch('/me', {
  //   headers: {
  //     ...additionalHeaders,
  //   },
  // });
  // if (userInfoResponse.status !== 200) {
  //   redirect(ctx, '/login');
  // }
  // const user = await userInfoResponse.json();
  // const { email } = user;
  // const { email } = userInfo;
  const { email } = userInfo;
  return { email };
};

export default Index;
