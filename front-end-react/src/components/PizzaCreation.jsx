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

    const [inputInProgress, setInputInProgress] = useState({ 
        name: '',
        location: '',
        size: '',
        // left_toppings: {},
        // right_toppings: {}
    });
    
    
    const updateTyping = (e) => {
      setInputInProgress({ ...inputInProgress, [e.target.name]: e.target.value });
      
    }
    
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

    const incrementBoth = (index, leftfield) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, number2: topping[leftfield] + 1, number3: topping[leftfield] + 1 };
        }
        return topping;
      });
  
      setToppings(newToppings);
    };
  
    const decrementBoth = (index, leftfield) => {
      const newToppings = toppings.map((topping, i) => {
        if (i === index) {
          return { ...topping, number2: topping[leftfield] - 1, number3: topping[leftfield] - 1 };
        }
        return topping;
      });
  
      setToppings(newToppings);
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

    //   const addNewIngredient = async () => {
 
    //     try {
    //       const responseIngredients = await axios.post("http://127.0.0.1:8000/ingredients/", {
    //         name: inputInProgress.name,
    //         description: inputInProgress.description,
    //         image_url: inputInProgress.image_url,
    //         half_calories_8_in: inputInProgress.half_calories_8_in,
    //         half_calories_12_in: inputInProgress.half_calories_12_in,
    //         half_calories_16_in: inputInProgress.half_calories_16_in,
    //         half_price_8_in: inputInProgress.half_price_8_in,
    //         half_price_12_in: inputInProgress.half_price_12_in,
    //         half_price_16_in: inputInProgress.half_price_16_in,

    //       }, {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });
     
    //         console.log(`ingredient is ${responseIngredients.data}`)
     
    //         if (responseIngredients.status === 201) {
    //             console.log("ingredient created");
    //         } else {
    //             console.error("Failed to add ingredient:", responseIngredients.statusText);
    //         }
    //     } catch (error) {
    //       console.error("Error:", error)
    //     }
      
    //   };

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

        <input className=""
            name="location"
            placeholder="location dropdown"
            type="integer" 
            value={inputInProgress.location}
            onChange={updateTyping}
            required
            />

        <input className=""
            name="size"
            placeholder="size dropdown"
            type="integer" 
            value={inputInProgress.size}
            onChange={updateTyping}
            required
            />

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
                    <button type="button" onClick={() => decrementBoth(index, 'number2')}>-</button>
                    <button type="button" onClick={() => incrementBoth(index, 'number2')}>+</button>
                  </div>
                  <div>
                    <label>Left:</label>
                    <input
                      type="number"
                      value={topping.number2}
                      onChange={(event) => handleNumberChange(index, 'number2', event)}
                    />
                    <button type="button" onClick={() => decrementValue(index, 'number2')}>-</button>
                    <button type="button" onClick={() => incrementValue(index, 'number2')}>+</button>
                  </div>
                  <div>
                    <label>Right:</label>
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


        <button className="searchBtn">Submit</button>
      </form>
      <button className="" onClick={returnToHome}>Cancel</button>
      <div>Calories:</div>
      <div>Price:</div>
      </div>



    )


}