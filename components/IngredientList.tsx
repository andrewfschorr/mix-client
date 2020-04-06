import doFetch from 'utils/doFetch';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useState } from 'react';
import { Ingredient, Units } from 'models/types';
import { enumKeys } from 'utils/enumHelper';

const validateRegex = /[+-]?\d+(?:[\.\/]?\d+)?/gm;
const allowCharsRegex = /^[0-9./]+$/;

const loadOptions = (inputVal, callBack) => {
  doFetch(`/ingredients${inputVal.trim() ? `?q=${inputVal}` : ''}`)
    .then((resp) => resp.json())
    .then((resp) =>
      resp.map((drink) => ({
        value: drink.name,
        label: drink.name,
        id: drink.id,
      }))
    )
    .then(callBack);
};

const IngredientList = ({
  amount = '',
  unit = 1, // TODO figure out better way to do this
  ingredient = '',
}): JSX.Element => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  // ingredient being added
  const [amountToAdd, setAmount] = useState<string>(amount);
  const [unitToAdd, setUnit] = useState<number>(unit);
  const [ingredientToAdd, setIngredient] = useState<string>(ingredient);
  return (
    <>
      {ingredients.length ? <ul>
        {ingredients.map((ingredient, i) => {
          return <li key={i}>{ingredient.amount} {Units[ingredient.unit]} &ndash; {ingredient.ingredient}</li>
        })}
      </ul> : <h3>This drink doesn't seem to have a recipe 😕 - add ingredients below.</h3>}


      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-2">
          <h4>Amount</h4>
          <input
            value={amountToAdd}
            onChange={(e) => {
              if (
                e.target.value === '' ||
                allowCharsRegex.test(e.target.value)
              ) {
                setAmount(e.target.value);
              }
            }}
            className="w-full border rounded py-2 px-3"
            type="text"
          />
        </div>
        <div className="col-span-2">
          <h4>Unit</h4>

          <select
            className="block appearance-none bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight"
            onChange={(e) => setUnit(Number(e.target.value))}
            value={unitToAdd}
          >
            {enumKeys(Units).map((item, i) => {
              return (
                <option key={i} value={i + 1}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-7">
          <h4>Ingredient</h4>
          <AsyncCreatableSelect
            instanceId={1} // da fuq
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={(e) => setIngredient(e.value)}
          />
        </div>
        <div
          className="col-span-1 flex justify-center items-center"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            if (!amountToAdd || !unitToAdd || !ingredientToAdd) return;
            setIngredients((ingredients) => {
              // TODO validate that ingredient hasn't been added yet
              return ingredients.concat({
                amount: amountToAdd,
                unit: unitToAdd,
                ingredient: ingredientToAdd,
              });
            });
          }}
        >
          <svg
            className="bi bi-plus-circle-fill"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default IngredientList;
