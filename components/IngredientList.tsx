import doFetch from 'utils/doFetch';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { useState, useEffect } from 'react';
import { Ingredient, Units } from 'models/types';
import { enumKeys } from 'utils/enumHelper';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

const tWconfig = resolveConfig(tailwindConfig);
const validateRegex = /[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/;
const allowCharsRegex = /^[0-9./]+$/;

interface ValidationError {
  type: string;
  message: string;
}

const NEW_INGREDIENT_WARNING = 'newIngredient';

const newIngredientWarning = {
  type: NEW_INGREDIENT_WARNING,
  message:
    "It looks like you're including an ingredient that we don't already have. This may chage when our moderation team has to approve it... Or it may not. Happy drinking!",
};

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
  name = '',
}): JSX.Element => {
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [ingredientToAdd, setIngredientToAdd] = useState<Ingredient>({
    name,
    unit, // Units enum below
    amount,
  });
  // errors
  const [hasAmountError, setAmountError] = useState<boolean>(false);
  const [hasUnitError, setUnitError] = useState<boolean>(false);
  const [hasIngredientError, setIngredientError] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  useEffect(() => {
    const hasNewIngredient = ingredientsList.some((i) => i.isNew);
    const alreadyHasWarningMessage = validationErrors.some((e) => e.type === NEW_INGREDIENT_WARNING);
    if (hasNewIngredient && !alreadyHasWarningMessage) {
      setValidationErrors((validationErrors) =>
        validationErrors.concat(newIngredientWarning)
      );
    } else if (!hasNewIngredient) {
      setValidationErrors((validationErrors) => validationErrors.filter(e => e.type !== NEW_INGREDIENT_WARNING));
    }
  }, [ingredientsList]);

  return (
    <>
      {ingredientsList.length ? (
        <ul className="my-3">
          {ingredientsList.map((ingredient, i) => {
            return (
              <li key={i}>
                {ingredient.amount} {Units[ingredient.unit]} &ndash;{' '}
                {ingredient.name}
                <span className="inline-block ml-2" style={{verticalAlign: 'middle', cursor: 'pointer'}} onClick={e => {
                  setIngredientsList(ingredientsList => ingredientsList.filter(i => i.name !== ingredient.name));
                }}>
                  <svg className="bi bi-trash-fill" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd"/>
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 className="my-6">
          This drink doesn't seem to have a recipe 😕 - add ingredients below.
        </h3>
      )}

      {validationErrors.length ? (
        <div className="border border-red-700 bg-red-200 rounded px-2 py-6 mb-3">
          {validationErrors.map((error) => (
            <div className="flex justify-center items-center" key={error.type}>
              <svg
                className="inline-block bi bi-exclamation-triangle-fill mr-2"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 5zm.002 6a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{error.message}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 grid-cols-12">
        <div className="col-span-2">
          <h4>Amount</h4>
          <input
            value={ingredientToAdd.amount}
            onChange={(e) => {
              if (
                e.target.value === '' ||
                allowCharsRegex.test(e.target.value)
              ) {
                const amount = e.target.value;
                setIngredientToAdd((ingredientToAdd) => ({
                  ...ingredientToAdd,
                  amount,
                }));
              }
            }}
            className={`w-full border rounded py-2 px-3 ${
              hasAmountError ? ' border border-red-400' : ''
            }`}
            type="text"
          />
        </div>
        <div className="col-span-2">
          <h4>Unit</h4>
          <select
            className={`block appearance-none bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight ${
              hasUnitError ? 'border border-red-400' : ''
            } `}
            onChange={(e) => {
              const unit = Number(e.target.value);
              setIngredientToAdd((ingredientToAdd) => ({
                ...ingredientToAdd,
                unit,
              }));
            }}
            value={ingredientToAdd.unit}
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
            onChange={(e) => {
              const isNew = e.__isNew__;
              const name = e.value;
              setIngredientToAdd((ingredientToAdd) => ({
                ...ingredientToAdd,
                name,
                isNew,
              }));
            }}
            styles={{
              control: (provided, state) => {
                return {
                  ...provided,
                  ...(hasIngredientError
                    ? {
                        borderColor: tWconfig.theme.colors.red[400],
                      }
                    : {}),
                };
              },
            }}
          />
        </div>
        <div
          className="col-span-1 flex justify-center items-center"
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            let hasError;

            if (
              ingredientToAdd.amount.trim() === '' ||
              !validateRegex.test(ingredientToAdd.amount)
            ) {
              setAmountError(true);
              hasError = true;
            } else {
              setAmountError(false);
            }

            // this will probably never happen given its a select with a default
            if (!ingredientToAdd.unit) {
              setUnitError(true);
              hasError = true;
            } else {
              setUnitError(false);
            }

            const isDup = ingredientsList.some(
              (ingredient) => ingredient.name === ingredientToAdd.name
            );

            if (!ingredientToAdd.name || isDup) {
              setIngredientError(true);
              hasError = true;
            } else {
              setIngredientError(false);
            }

            if (hasError) return;

            setIngredientsList((ingredientsList) => {
              return ingredientsList.concat(ingredientToAdd);
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
