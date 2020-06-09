import { useState, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import makeRequest from 'utils/makeRequest';
import Async from 'react-select/async';
import { debounce } from 'utils';
// import AppContext from 'utils/AppContext';
// import { turnAuthCookieIntoHeader } from 'utils/requestHelpers';

import styles from './styles/DrinkSearch.module.css';

const loadOptions = (inputVal, callBack) => {
  makeRequest(`/drinks${inputVal.trim() ? `?q=${inputVal}` : ''}`)
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

const debouncedLoadOptions = debounce(loadOptions, 1000);

const DrinkSearch = ({ drinks, removeDrinkCb, updateUserDrinks }) => {
  // const router = useRouter();
  // i dont think this is even really used
  const [selectedDrinkId, updateSelectedDrink] = useState(null);
  // const { cookie } = useContext(AppContext);

  return (
    <div>
      <h2 className="mb-2">Search For a Cocktail</h2>
      <div className="flex">
        <Async
          className="w-full"
          instanceId={1} // da fuq
          loadOptions={debouncedLoadOptions}
          defaultOptions
          components={{ NoOptionsMessage }}
          styles={{
            option: base => ({
              ...base,
              '&:hover': {
                cursor: 'pointer'
              }
            })
          }}
          onChange={(itemSelection, actionData) => {
            if (actionData.action === 'clear') {
              updateSelectedDrink(null);
            } else {
              updateSelectedDrink(itemSelection.id);
              const { id } = itemSelection;
              Router.push(`/drink/[id]`, `/drink/${id}`)
            }
          }}
        />
      </div>
    </div>
  );
};

export default DrinkSearch;
