import { useState } from 'react';

const DrinkList = () => {
  const [drinks, updateDrinks] = useState([]);
  return (
    <div>
        {drinks.length ? drinks.map(drink => {
          return <p>{drink}</p>
        }) : null}
    </div>
  );
};

export default DrinkList;
