import { Link, useNavigate } from "react-router-dom"
import Nav from './Nav'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function PizzaCreation() {

    let navigate = useNavigate()

    const [ingredients, setIngredients] = useState([])
    const [toppings, setToppings] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
      // Fetch data from the API when the component mounts
      const fetchData = async () => {
        try {
            const responseIngredients = await axios.get(`http://127.0.0.1:8000/ingredients/`)
            setIngredients(responseIngredients.data);

            const responseLocations = await axios.get(`http://127.0.0.1:8000/locations/`)
            setLocations(responseLocations.data);
          
          // Transform ingredients into toppings array
          const toppingsData = responseIngredients.data.map(ingredient => ({
            ingredient: ingredient,
            leftTopping: 0,
            rightTopping: 0,
            half_calories_8_in: ingredient.half_calories_8_in,
            half_calories_12_in: ingredient.half_calories_12_in,
            half_calories_16_in: ingredient.half_calories_16_in,
            half_price_8_in: ingredient.half_price_8_in,
            half_price_12_in: ingredient.half_price_12_in,
            half_price_16_in: ingredient.half_price_16_in,

          }));
          setToppings(toppingsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const [inputInProgress, setInputInProgress] = useState({ 
        name: '',
        location: '',
        size: '16inch',
        calories: 0,
        price: 0,
    });
    
    
    const updateTyping = (e) => {
      setInputInProgress({ ...inputInProgress, [e.target.name]: e.target.value });
      
    }

    useEffect(() => {
      const { newCalories, newPrice } = updateCaloriesPrice();
      setInputInProgress(prevState => ({
        ...prevState,
        calories: newCalories,
        price: newPrice,
      }));
    }, [toppings, inputInProgress.size]); 

    const updateCaloriesPrice = () => {
      let newCalories = 0;
      let newPrice = 0;
    
      toppings.forEach((topping) => {
        const totalTopping = topping.leftTopping + topping.rightTopping;
    
        switch (inputInProgress.size) {
          case "8inch":
            newPrice += totalTopping * topping.half_price_8_in;
            newCalories += totalTopping * topping.half_calories_8_in;
            break;
          case "12inch":
            newPrice += totalTopping * topping.half_price_12_in;
            newCalories += totalTopping * topping.half_calories_12_in;
            break;
          case "16inch":
            newPrice += totalTopping * topping.half_price_16_in;
            newCalories += totalTopping * topping.half_calories_16_in;
            break;
          default:
            break;
        }
        console.log(`current calories: ${newCalories}`)
        console.log(`current price: ${newPrice}`)
      });
    
      // console.log(`calories: ${inputInProgress.calories}`)
      // console.log(`price: ${inputInProgress.price}`)
      console.log(`size: ${inputInProgress.size}`)
      return { newCalories, newPrice };

    };
    
    
    const handleNumberChange = (index, field, event) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, [field]: parseInt(event.target.value, 10) || 0 };
        }
        return topping;
      });
  
      setToppings(newToppings);
      updateCaloriesPrice()
    };
  
    const incrementValue = (index, field) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, [field]: topping[field] + 1 };
        }
        return topping;
      });
  
      setToppings(newToppings);
      updateCaloriesPrice()
    };
  
    const decrementValue = (index, field) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, [field]: topping[field] - 1 };
        }
        return topping;
      });
  
      setToppings(newToppings);
      updateCaloriesPrice()
    };

    const incrementBoth = (index, leftfield) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, leftTopping: topping[leftfield] + 1, rightTopping: topping[leftfield] + 1 };
        }
        return topping;
      });
  
      setToppings(newToppings);
      updateCaloriesPrice()
    };
  
    const decrementBoth = (index, leftfield) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, leftTopping: topping[leftfield] - 1, rightTopping: topping[leftfield] - 1 };
        }
        return topping;
      });
  
      setToppings(newToppings);
      updateCaloriesPrice()
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     addNewIngredient()
    //     navigate(`/ingredients`);
    //   }

      const returnToHome = () => {
        navigate(`/`)
        // fix link color!
      }

    return(
        <div className="form-container">
          New Pizza
        <form className="form" 
        // onSubmit={handleSubmit}
        >

        <input className=""
          name="name"
          placeholder="Customer Name"
          type="text" 
          value={inputInProgress.name}
          onChange={updateTyping}
          required
        />

      <select
        className=""
        name="location"
        value={inputInProgress.location}
        onChange={updateTyping}
        required
        >
        <option value="" disabled>
          location
        </option>
        {locations.map((location) => (
          <option key={location.id} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>

      <select
        className=""
        name="size"
        value={inputInProgress.size}
        onChange={updateTyping}
        required
        >
        <option value="" disabled>
          size
        </option>
        <option value="8inch" >
          8 inch
        </option>
        <option value="12inch" >
          12 inch
        </option>
        <option value="16inch" >
          16 inch
        </option>
        </select>

        {toppings.map((topping, index) => (
                <div key={index}>
                  <label>Ingredient: {topping.ingredient.name}</label>
                  <div>
                    <label>Both:</label>
                    {/* <input
                      type="number"
                      value={topping.number1}
                      onChange={(event) => handleNumberChange(index, 'number1', event)}
                    /> */}
                    <button type="button" onClick={() => decrementBoth(index, 'leftTopping')}>-</button>
                    <button type="button" onClick={() => incrementBoth(index, 'leftTopping')}>+</button>
                  </div>
                  <div>
                    <label>Left:</label>
                    <input
                      type="number"
                      value={topping.leftTopping}
                      onChange={(event) => handleNumberChange(index, 'leftTopping', event)}
                    />
                    <button type="button" onClick={() => decrementValue(index, 'leftTopping')}>-</button>
                    <button type="button" onClick={() => incrementValue(index, 'leftTopping')}>+</button>
                  </div>
                  <div>
                    <label>Right:</label>
                    <input
                      type="number"
                      value={topping.rightTopping}
                      onChange={(event) => handleNumberChange(index, 'rightTopping', event)}
                    />
                    <button type="button" onClick={() => decrementValue(index, 'rightTopping')}>-</button>
                    <button type="button" onClick={() => incrementValue(index, 'rightTopping')}>+</button>
                  </div>
                </div>
      ))}


        <button className="searchBtn">Submit</button>
      </form>
      <button className="" onClick={returnToHome}>Cancel</button>
      <div>Calories: {inputInProgress.calories}</div>
      <div>Price: {inputInProgress.price}</div>
      </div>



    )


}