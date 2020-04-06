import Link from 'next/link';
import doFetch from 'utils/doFetch.js';
import Async from 'react-select/async';
import { useState } from 'react';

import styles from './styles/DrinkSearch.module.css';

const loadOptions = (inputVal, callBack) => {
  doFetch(`/drinks${inputVal.trim() ? `?q=${inputVal}` : ''}`)
    .then((resp) => resp.json())
    .then((resp) => resp.map((drink) => ({
      value: drink.name,
      label: drink.name,
      id: drink.id,
    }))).then(callBack);
};


const NoOptionsMessage = props => {
  return (
    <Link href="/drink/add">
      <span className={styles.noResults}>
        Can't find your drink? <a className={styles.noResultsAnchor} href="#"> Add one</a>
      </span>
    </Link>
  );
}

const DrinkSearch = ({ drinks, removeDrinkCb, updateUserDrinks }) => {
  const [selectedDrinkId, updateSelectedDrink] = useState(null);
  // the drinks the user already has checked in

  return (
    <div>
      <h2 className="mb-2">Search For a Cocktail</h2>
      <div className="flex">
        <Async
          className="w-full"
          instanceId={1} // da fuq
          loadOptions={loadOptions}
          defaultOptions
          components={{ NoOptionsMessage }}
          styles={{ NoOptionsMessage: base => ({ ...base, ...{
            background: 'red',
          }})}}
          onChange={(itemSelection, actionData) => {
            if (actionData.action === 'clear') {
              updateSelectedDrink(null);
            } else {
              updateSelectedDrink(itemSelection.id);
            }
          }}
        />
      </div>
    </div>
  );
};

export default DrinkSearch;
