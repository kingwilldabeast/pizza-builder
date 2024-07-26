// export default function Home (props) {

//     return (
      
//       <div className="home">
//         <h2>Welcome to Zapata's Pizza</h2>
//       </div>
//     )
//   }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [ingredients, setIngredients] = useState([]);
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ingredients');
        setIngredients(response.data);
        
        // Transform ingredients into toppings array
        const toppingsData = response.data.map(ingredient => ({
          ingredient: ingredient,
          number1: 0,
          number2: 0,
          number3: 0
        }));
        setToppings(toppingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNumberChange = (index, field, event) => {
    const newToppings = toppings.map((topping, i) => {
      if (i === index) {
        return { ...topping, [field]: parseInt(event.target.value, 10) || 0 };
      }
      return topping;
    });

    setToppings(newToppings);
  };

  const incrementValue = (index, field) => {
    const newToppings = toppings.map((topping, i) => {
      if (i === index) {
        return { ...topping, [field]: topping[field] + 1 };
      }
      return topping;
    });

    setToppings(newToppings);
  };

  const decrementValue = (index, field) => {
    const newToppings = toppings.map((topping, i) => {
      if (i === index) {
        return { ...topping, [field]: topping[field] - 1 };
      }
      return topping;
    });

    setToppings(newToppings);
  };

  return (
    <form>
      {toppings.map((topping, index) => (
        <div key={index}>
          <label>Ingredient: {topping.ingredient.name}</label>
          <div>
            <label>Number 1:</label>
            <input
              type="number"
              value={topping.number1}
              onChange={(event) => handleNumberChange(index, 'number1', event)}
            />
            <button type="button" onClick={() => decrementValue(index, 'number1')}>-</button>
            <button type="button" onClick={() => incrementValue(index, 'number1')}>+</button>
          </div>
          <div>
            <label>Number 2:</label>
            <input
              type="number"
              value={topping.number2}
              onChange={(event) => handleNumberChange(index, 'number2', event)}
            />
            <button type="button" onClick={() => decrementValue(index, 'number2')}>-</button>
            <button type="button" onClick={() => incrementValue(index, 'number2')}>+</button>
          </div>
          <div>
            <label>Number 3:</label>
            <input
              type="number"
              value={topping.number3}
              onChange={(event) => handleNumberChange(index, 'number3', event)}
            />
            <button type="button" onClick={() => decrementValue(index, 'number3')}>-</button>
            <button type="button" onClick={() => incrementValue(index, 'number3')}>+</button>
          </div>
        </div>
      ))}
    </form>
  );
};

export default FormComponent;
