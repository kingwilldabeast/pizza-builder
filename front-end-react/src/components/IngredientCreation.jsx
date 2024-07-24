import { Link, useNavigate } from "react-router-dom"
import Nav from './Nav'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function IngredientCreation() {

    let navigate = useNavigate()

    const [inputInProgress, setInputInProgress] = useState({ 
        name: '',
        description: '',
        image_url: '',
        half_calories_8_in: '',
        half_calories_12_in: '',
        half_calories_16_in: '',
        half_price_8_in: '',
        half_price_12_in: '',
        half_price_16_in: ''
    });

    const updateTyping = (e) => {
        setInputInProgress({ ...inputInProgress, [e.target.name]: e.target.value });
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewIngredient()
        navigate(`/ingredients`);
      }

      const returnToIngredients = () => {
        navigate(`/ingredients`)
      }

      const addNewIngredient = async () => {
 
        try {
          const response = await axios.post("http://127.0.0.1:8000/ingredients/", {
            name: inputInProgress.name,
            description: inputInProgress.description,
            image_url: inputInProgress.image_url,
            half_calories_8_in: inputInProgress.half_calories_8_in,
            half_calories_12_in: inputInProgress.half_calories_12_in,
            half_calories_16_in: inputInProgress.half_calories_16_in,
            half_price_8_in: inputInProgress.half_price_8_in,
            half_price_12_in: inputInProgress.half_price_12_in,
            half_price_16_in: inputInProgress.half_price_16_in,

          }, {
            headers: {
              "Content-Type": "application/json",
            },
          });
     
            console.log(`ingredient is ${response.data}`)
     
            if (response.status === 201) {
                console.log("ingredient created");
            } else {
                console.error("Failed to add ingredient:", response.statusText);
            }
        } catch (error) {
          console.error("Error:", error)
        }
      
      };

    return(
        <div className="form-container">
          New Ingredient
        <form className="form" onSubmit={handleSubmit}>

        <input className=""
          name="name"
          placeholder="ingredient name"
          type="text" 
          value={inputInProgress.name}
          onChange={updateTyping}
          required
        />
        <input className=""
          name="description"
          placeholder="description"
          type="text" 
          value={inputInProgress.description}
          onChange={updateTyping}
          required
        />        
        <input className=""
          name="image_url"
          placeholder="image link"
          type="text" 
          value={inputInProgress.image_url}
          onChange={updateTyping}
          required
        />
        <input className=""
            name="half_calories_8_in"
            placeholder="calories for 8 inch "
            type="integer" 
            value={inputInProgress.half_calories_8_in}
            onChange={updateTyping}
            required
            />

            <input className=""
            name="half_calories_12_in"
            placeholder="calories for 12 inch"
            type="integer" 
            value={inputInProgress.half_calories_12_in}
            onChange={updateTyping}
            required
            />

            <input className=""
            name="half_calories_16_in"
            placeholder="calories for 16 inch"
            type="integer" 
            value={inputInProgress.half_calories_16_in}
            onChange={updateTyping}
            required
            />

            <input className=""
            name="half_price_8_in"
            placeholder="price for 8 inch"
            type="float" 
            value={inputInProgress.half_price_8_in}
            onChange={updateTyping}
            required
            />

            <input className=""
            name="half_price_12_in"
            placeholder="price of for 12 inch"
            type="float" 
            value={inputInProgress.half_price_12_in}
            onChange={updateTyping}
            required
            />

            <input className=""
            name="half_price_16_in"
            placeholder="price of for 16 inch"
            type="float" 
            value={inputInProgress.half_price_16_in}
            onChange={updateTyping}
            required
            />


        <button className="searchBtn">Submit</button>
      </form>
      <button className="" onClick={returnToIngredients}>Cancel</button>
      </div>



    )


}