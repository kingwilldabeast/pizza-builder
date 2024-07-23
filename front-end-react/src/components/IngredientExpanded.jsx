import { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'


export default function IngredientExpanded (props) {

  const [ingredient, setIngredient] = useState('')

  let {ingredientID} = useParams() 

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/ingredients/${ingredientID}`)
      console.log('data', response)
      
      //assign API results to array
      setIngredient(response.data)
    }
    getData()

  }, [props.ingredients, ingredientID])

  return ingredient ? (
    <div className="expandedItem">
      <Link to ='/ingredients' className='navtext'>Back to Ingredients</Link>
        <br/>
      <div className='expandedBody'>
        <div className='expandedText'>
        <h2>{ingredient.name}</h2>


        </div>

        <img src = {ingredient.image_url} 
        className='expandedImage'
        />
      </div>
    </div>
  ) 
  :     <div> 
            <div className='home'>  
            <h2>Ingredient not found</h2>
            <Link to ='/ingredients' className='navtext'>Back to Ingredients</Link>
            </div> 
        </div>
}

