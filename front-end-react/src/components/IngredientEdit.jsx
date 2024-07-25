import { Link, useNavigate, useParams } from "react-router-dom"
import Nav from './Nav'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function IngredientEdit() {

    const { ingredientID } = useParams()
    let navigate = useNavigate()
    const [currentIngredient,setCurrentIngredient] = useState({})
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

    useEffect(() => {
  
        const getCurrentIngredient = async () => {
          const response = await axios.get(`http://127.0.0.1:8000/ingredients/${ingredientID}`)
          const ingredient_data = response.data
          setCurrentIngredient(ingredient_data)
      }
      getCurrentIngredient()
      
  }, [])

  useEffect(() => {
    setInputInProgress({
        name: currentIngredient.name || "",
        description: currentIngredient.description || "",
        image_url: currentIngredient.image_url || "",
        half_calories_8_in: currentIngredient.half_calories_8_in || "",
        half_calories_12_in: currentIngredient.half_calories_12_in || "",
        half_calories_16_in: currentIngredient.half_calories_16_in || "",
        half_price_8_in: currentIngredient.half_price_8_in || "",
        half_price_12_in: currentIngredient.half_price_12_in || "",
        half_price_16_in: currentIngredient.half_price_16_in || "",
        });
    }, [currentIngredient]); 

    const updateTyping = (e) => {
        setInputInProgress({ ...inputInProgress, [e.target.name]: e.target.value });
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateIngredient()
        navigate(`/ingredients/${ingredientID}`);
      }

      const returnToIngredient = (ingredientID) => {
        navigate(`/ingredients/${ingredientID}`)
      }

      const updateIngredient = async () => {
    
        try {
        const response = await axios.put(`http://127.0.0.1:8000/ingredients/${ingredientID}/`, {
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
            if (response.status === 200) {
                console.log("ingredient updated");
            } else {
                console.error("Failed to update ingredient:", response.statusText);
            }
        } catch (error) {
        console.error("Error:", error)
        }
    
    }
    
    return(
        <div className="form-container">
            Edit Ingredient
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
        placeholder="calories of ingredients for 8 inch pizza"
        type="integer" 
        value={inputInProgress.half_calories_8_in}
        onChange={updateTyping}
        required
        />

        <input className=""
        name="half_calories_12_in"
        placeholder="calories of ingredients for 12 inch pizza"
        type="integer" 
        value={inputInProgress.half_calories_12_in}
        onChange={updateTyping}
        required
        />

        <input className=""
        name="half_calories_16_in"
        placeholder="calories of ingredients for 16 inch pizza"
        type="integer" 
        value={inputInProgress.half_calories_16_in}
        onChange={updateTyping}
        required
        />

        <input className=""
        name="half_price_8_in"
        placeholder="price of ingredients for 8 inch pizza"
        type="float" 
        value={inputInProgress.half_price_8_in}
        onChange={updateTyping}
        required
        />

        <input className=""
        name="half_price_12_in"
        placeholder="price of ingredients for 12 inch pizza"
        type="float" 
        value={inputInProgress.half_price_12_in}
        onChange={updateTyping}
        required
        />

        <input className=""
        name="half_price_16_in"
        placeholder="price of ingredients for 16 inch pizza"
        type="float" 
        value={inputInProgress.half_price_16_in}
        onChange={updateTyping}
        required
        />


        <button className="searchBtn">Submit</button>
        </form>
      <button className="searchBtn" onClick={() => returnToIngredient(ingredientID)}>Cancel</button>
      </div>



    )


}