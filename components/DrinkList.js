import doFetch from 'utils/doFetch.js';
import Async from 'react-select/async';
// import 'react-select/dist/react-select.css';
import { useState } from 'react';

const loadOptions = (inputVal, callBack) => {
  doFetch(`/drinks${inputVal.trim() ? `?q=${inputVal}` : ''}`)
    .then((resp) => resp.json())
    .then((resp) => resp.map((drink) => ({
      value: drink.name,
      label: drink.name,
    }))).then(callBack);
};

const DrinkList = ({ drinks }) => {
  const [selectedDrink, updateSelectedDrink] = useState(null);
  return (
    <div>
      <ul>
        {drinks.length ? drinks.map((drink) => {
          return (
            <li key={drink.name} className="border-solid border-b-2 border-gray-600 py-1">
              {drink.name}
            </li>
          );
        }) : null}
      </ul>
      <h4 className="my-4">Add Drink</h4>
      <Async
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default DrinkList;
