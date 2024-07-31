import { Link, useNavigate } from "react-router-dom"
import Nav from './Nav'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Draggable from "react-draggable"

export default function PizzaCreation() {

    let navigate = useNavigate()

    const [locations, setLocations] = useState([]);
    const [ingredients, setIngredients] = useState([])
    const [toppings, setToppings] = useState([]);
    const [inputInProgress, setInputInProgress] = useState({ 
      name: 'Bob',
      location: 'West',
      size: '16 inch',
      notes: 'extra crispy',
      calories: 0,
      price: 0,
  });

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

      // Map the location name to its ID
      const getLocationIdByName = (name) => {
        const location = locations.find(loc => loc.name === name);
        return location ? location.id : null;
      };

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
          case "8 inch":
            newPrice += totalTopping * topping.half_price_8_in;
            newCalories += totalTopping * topping.half_calories_8_in;
            break;
          case "12 inch":
            newPrice += totalTopping * topping.half_price_12_in;
            newCalories += totalTopping * topping.half_calories_12_in;
            break;
          case "16 inch":
            newPrice += totalTopping * topping.half_price_16_in;
            newCalories += totalTopping * topping.half_calories_16_in;
            break;
          default:
            break;
        }
        // console.log(`current calories: ${newCalories}`)
        // console.log(`current price: ${newPrice}`)
      });
    
      // console.log(`calories: ${inputInProgress.calories}`)
      // console.log(`price: ${inputInProgress.price}`)
      // console.log(`size: ${inputInProgress.size}`)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewPizza()
        // addToppingstoPizza()
        // navigate(`/ingredients`);
        console.log(inputInProgress)
        // console.log(toppings)
      }

    const addNewPizza = async () => {
      
      const locationId = getLocationIdByName(inputInProgress.location);
      const locationIdURL = `http://127.0.0.1:8000/locations/${locationId}/`
      console.log(locationId)
    
      if (!locationId) {
        console.error("Invalid location selected");
        return;
      }

      try {
        const response = await axios.post("http://127.0.0.1:8000/pizzas/", {
          name: inputInProgress.name,
          // location: inputInProgress.location,
          location_id: locationIdURL,
          size: inputInProgress.size,
          notes: inputInProgress.notes,
          calories: inputInProgress.calories,
          price: inputInProgress.price,
          // toppings: toppings //?
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
   
          console.log(`pizza is ${response.data}`)
   
          if (response.status === 201 || response.status === 200) {
              console.log("pizza created");
          } else {
              console.error("Failed to add pizza:", response.statusText);
          }
      } catch (error) {
        console.error("Error:", error)
      }
    
    };

    const addToppingstoPizza = async () => {
      // incomplete
    }

      const returnToHome = () => {
        navigate(`/`)
      }

    return(
      // <Draggable>
        <div className="form-container">
          New Pizza
        <form className="form" 
        onSubmit={handleSubmit}
        >

        <input className=""
          name="name"
          placeholder="Customer Name"
          type="text" 
          value={inputInProgress.name}
          onChange={updateTyping}
          required
        />

        <input className=""
          name="notes"
          placeholder="additional notes"
          type="text" 
          value={inputInProgress.notes}
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
        <option value="8 inch" >
          8 inch
        </option>
        <option value="12 inch" >
          12 inch
        </option>
        <option value="16 inch" >
          16 inch
        </option>
        </select>

        {toppings.map((topping, index) => (
                <div 
                className = 'topping-item' 
                key={index}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${topping.ingredient.image_url})`, 
                  backgroundSize:'300px', 
                  backgroundPosition: '50% 50%'}} 
                >
                  <label>{topping.ingredient.name}</label>
                  <div>
                    <label>Both:</label>
                    <button type="button" onClick={() => decrementBoth(index, 'leftTopping')}>-</button>
                    <button type="button" onClick={() => incrementBoth(index, 'leftTopping')}>+</button>
                  </div>

                  <div className="topping-increments">
                  <div>
                    <label>Left:</label>
                    <input
                      type="number"
                      value={topping.leftTopping}
                      onChange={(event) => handleNumberChange(index, 'leftTopping', event)}
                      style={{ width: '30px' }} 
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
                      style={{ width: '30px' }} 
                      />
                    <button type="button" onClick={() => decrementValue(index, 'rightTopping')}>-</button>
                    <button type="button" onClick={() => incrementValue(index, 'rightTopping')}>+</button>
                  </div>
                  </div>

                </div>
      ))}


        <button className="searchBtn" >Submit</button>
      </form>
      <button className="" onClick={returnToHome}>Cancel</button>
      <div>Calories: {inputInProgress.calories}</div>
      <div>Price: {inputInProgress.price}</div>
      </div>
      // </Draggable>


    )


}