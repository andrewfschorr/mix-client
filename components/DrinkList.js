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
      id: drink.id,
    }))).then(callBack);
};

const DrinkList = ({ drinks, removeDrinkCb }) => {
  const [selectedDrink, updateSelectedDrink] = useState(null);
  // the drinks the user already has checked in
  const drinksMap = drinks.reduce((acc, cur) => {
    acc[cur.id] = true;
    return acc;
  }, {});
  // TOODO remove from this map on delete request
  return (
    <div>
      <ul>
        {drinks.length ? drinks.map((drink) => {
          return (
            <li key={drink.name} className="flex border-solid border-b-2 border-gray-600 py-1">
              {drink.name}
              <span onClick={(e) => {
                removeDrinkCb(drink.id);
              }} style={{ marginLeft: 'auto' }}>x</span>
            </li>
          );
        }) : null}
      </ul>
      <h4 className="my-4">Add Drink</h4>
      <div className="flex">
        <Async
          className="w-full"
          instanceId={1} // da fuq
          loadOptions={loadOptions}
          defaultOptions
          onChange={(itemSelection, actionData) => {
            if (actionData.action === 'clear') {
              updateSelectedDrink(null);
            } else {
              updateSelectedDrink(itemSelection.value);
            }
          }}
          isClearable
          filterOption={(responseItem, ) => {
            if (typeof responseItem.data !== 'object' || responseItem.data === null) {
              console.warn('Inavlid response drink object');
              return false;
            }
            const { id } = responseItem.data;
            return drinksMap[id] !== true;
          }}
        />
        <button
          disabled={!selectedDrink}
          type="button"
          className={
            `${selectedDrink ? ' ' : 'opacity-50 cursor-not-allowed '}bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`
          }>
          Add
        </button>
      </div>
    </div>
  );
};

export default DrinkList;
