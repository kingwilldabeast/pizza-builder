import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"


export default function IngredientsList () {

    const [ingredients, setIngredients] = useState([])
  
    let navigate = useNavigate()
    const showIngredient = (ingredientID) => {
      navigate(`${ingredientID}`)
    }

    useEffect(()=>{
      const getData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/ingredients/`)
        console.log('data', response)
        
        //assign API results to array
        setIngredients(response.data)
      }
      getData()
  
    },[])

    console.log(ingredients)
    
    if(!ingredients) {
        return <h1>Loading... please wait</h1>
    } else {
        return (
            <>
            <div className="objectList">
    
                {
                    ingredients.map((ingredient, index) => (
                        <div key={index} 
                        className="objectItem"
                        onClick={() => showIngredient(ingredient.id)}
                        style={{
                            backgroundImage: `url(${ingredient.image_url})`, 
                            // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ingredient.image_url})`, 
                            backgroundSize:'200px', 
                            backgroundPosition: '50% 50%'}} 
                        >
                            
                            <h2>{ingredient.name}</h2>
                            {/* <h3>Author: {ingredient.attributes.author}</h3> */}
                            {/* <h3>Summary: {ingredient.attributes.summary}</h3> */}
                        </div>    
                    ))
                }
    
            </div>

            <div className='objectList'>
                <Link to ='/newingredient' className='new-ingredient-button'>Create Ingredient</Link>
            </div>

            </>
        )

    }

  }