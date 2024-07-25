import { Link, useNavigate } from "react-router-dom"
import Nav from './Nav'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function PizzaCreation() {

    let navigate = useNavigate()

    const [ingredients, setIngredients] = useState([])
    useEffect(()=>{
        const getData = async () => {
          const response = await axios.get(`http://127.0.0.1:8000/ingredients/`)
          console.log('data', response)
          
          //assign API results to array
          setIngredients(response.data)
        }
        getData()
    
      },[])

    const [inputInProgress, setInputInProgress] = useState({ 
        name: '',
        location: '',
        size: '',
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

      const returnToHome = () => {
        navigate(`/`)
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
          New Pizza
        <form className="form" onSubmit={handleSubmit}>


      
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

            {
                ingredients.map((ingredient, index) => (
                    <div key={index} 
                    className=""
                    // onClick={() => showIngredient(ingredient.id)}
                    // style={{
                    //     backgroundImage: `url(${ingredient.image_url})`, 
                    //     // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ingredient.image_url})`, 
                    //     backgroundSize:'200px', 
                    //     backgroundPosition: '50% 50%'}} 
                    >
                        <div className="ingredient-select">
                        <div>{ingredient.name}</div>
                        <div className="ingredient-column">
                            <div>Both</div>
                            <div className="ingredient-toggle">
                                <div className="ingredient-arrow">^</div>
                                <div className="ingredient-arrow">v</div>
                                {/* <input className="ingredient-amount"/> */}
                            </div>
                        </div>
                        <div className="ingredient-column">
                            <div>Left</div>
                            <div className="ingredient-toggle">
                                <div className="ingredient-arrow">^</div>
                                <div className="ingredient-arrow">v</div>
                                <input className="ingredient-amount"/>
                            </div>
                        </div>
                        <div className="ingredient-column">
                            <div>Right</div>
                            <div className="ingredient-toggle">
                                <div className="ingredient-arrow">^</div>
                                <div className="ingredient-arrow">v</div>
                                <input className="ingredient-amount"/>
                            </div>
                        </div>

                        </div>

                     </div>    
                ))
            }

        <button className="searchBtn">Submit</button>
      </form>
      <button className="" onClick={returnToHome}>Cancel</button>
      </div>



    )


}