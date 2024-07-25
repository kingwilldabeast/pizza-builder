import {Route, Routes} from 'react-router-dom'
import FileNotFound from './FileNotFound'
import Home from './Home'
import IngredientsList from './IngredientsList'
import IngredientExpanded from './IngredientExpanded'
import IngredientCreation from './IngredientCreation'
import IngredientEdit from './IngredientEdit'
import LocationsList from './LocationsList'
import LocationExpanded from './LocationExpanded'
import PizzaCreation from './PizzaCreation'

export default function Main (props) {
    // console.log(props)
    // const thing = ""
    return (
      
      <div className="main">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ingredients" element={<IngredientsList/>}/>
            <Route path="/ingredients/:ingredientID" element={<IngredientExpanded/>}/>
            <Route path="/newingredient" element={<IngredientCreation/>}/>
            <Route path="/editingredient/:ingredientID" element={<IngredientEdit/>}/>
            <Route path="/locations" element={<LocationsList/>}/>
            <Route path="/locations/:locationID" element={<LocationExpanded/>}/>
            <Route path="/newpizza" element={<PizzaCreation/>}/>
            <Route path="*" element={<FileNotFound />}/>
        </Routes>
      </div>
    )
  }