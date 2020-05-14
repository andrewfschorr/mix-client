import { useReducer, useState, useEffect } from 'react';
import makeRequest from 'utils/makeRequest';
import Skeleton from 'common/Skeleton';
import AppContext from 'utils/AppContext';
import cookies from 'next-cookies';
import getAuthedUserFromJwt from 'utils/getAuthedUserFromJwt';
import IngredientList from 'components/IngredientList';
import { AppContextInterface } from 'models/types';
import { COOKIE_NAME } from 'utils/appConstants';
import { Drink } from 'models/types';
import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';
import Instructions from 'components/Instructions';

const reducer = (state, action): Drink => {
  if (action.type === 'name' || action.type === 'description') {
    return {
      ...state,
      [action.type]: action.data,
    };
  } else if (action.type === 'ingredients') {
    return {
      ...state,
      ingredients: [...action.data],
    };
  } else if (action.type === 'instructions') {
    return {
      ...state,
      instructions: [...action.data],
    };
  }
  return state;
};

function Index({ pathname, userInfo, cookie }) {
  const [drinkToAdd, drinkReducer] = useReducer(reducer, {
    name: '',
    description: '',
    ingredients: [],
    instructions: [],
  });

  useEffect(() => {
    if (
      drinkToAdd.instructions.length === 0 ||
      drinkToAdd.instructions[drinkToAdd.instructions.length - 1] !== ''
    ) {
      drinkReducer({
        type: 'instructions',
        data: [...drinkToAdd.instructions, ''],
      });
    }
  }, [drinkToAdd]);

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
    <AppContext.Provider value={{ ...userInfo, cookie }}>
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
                  drinkReducer({
                    type: 'name',
                    data: name,
                  });
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
                  drinkReducer({
                    type: 'description',
                    data: description,
                  });
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
                drinkReducer({
                  type: 'ingredients',
                  data: ingredients,
                });
              }}
            />
          </div>
          <div className="pt-6">
            <h2>Instructions</h2>
            <Instructions
              drinkReducer={drinkReducer}
              instructionList={drinkToAdd.instructions}
            />
          </div>
          <div className="flex justify-end">
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

                const { ingredients, name, description, instructions } = drinkToAdd;
                makeRequest('/drink', {
                  method: 'POST',
                  headers: turnAuthCookieIntoHeader(cookie),
                  body: {
                    ingredients,
                    name,
                    description,
                    instructions: instructions.filter(item => item),
                  },
                }).then((resp) => {
                  if (resp.status === 200) {
                    return resp.json();
                  }
                });
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
  const cookie = cookies(ctx)[COOKIE_NAME];
  const userInfo = getAuthedUserFromJwt(cookie);
  return {
    cookie,
    ...(userInfo ? { userInfo } : {}),
  };
};

export default Index;
