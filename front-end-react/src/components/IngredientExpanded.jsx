import { useEffect, useState } from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


export default function IngredientExpanded (props) {

  const [ingredient, setIngredient] = useState('')
  let {ingredientID} = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/ingredients/${ingredientID}`)
      console.log('data', response)
      
      //assign API results to array
      setIngredient(response.data)
    }
    getData()

  }, [props.ingredients, ingredientID])

  const openEditor = (e) => {
    navigate(`/editingredient/${ingredientID}`);
  }

  const deleteEvent = async (e) => {
      try {
          const response = await axios.delete(`http://127.0.0.1:8000/ingredients/${ingredientID}`, {
              headers: {
              "Content-Type": "application/json",
              },
          });
              console.log(response.status)
              if (response.status === 200 || response.status === 204) {
                  console.log("ingredient deleted");
                  navigate(`/ingredients`);
              } else {
                  console.error("Failed to delete ingredient:", response.statusText);
              }
          } catch (error) {
          console.error("Error:", error)
          }
  }

  return ingredient ? (
    <div className="expandedItem">
      <Link to ='/ingredients' className='navtext'>Back to Ingredients</Link>
        <br/>
      <div className='expandedBody'>
        <div className='expandedText'>
        <h2>{ingredient.name}</h2>

        <button onClick={openEditor}>Edit Event</button>
        <button onClick={deleteEvent}>Delete Event</button>
        </div>
        <div className='expandedImageContainer'>
          <img src = {ingredient.image_url} />
        </div>
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

