import {Route, Routes} from 'react-router-dom'
import FileNotFound from './FileNotFound'
import Home from './Home'
import IngredientsList from './IngredientsList'
import IngredientExpanded from './IngredientExpanded'
import LocationsList from './LocationsList'
import LocationExpanded from './LocationExpanded'

export default function Main (props) {
    // console.log(props)
    // const thing = ""
    return (
      
      <div className="main">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ingredients" element={<IngredientsList/>}/>
            <Route path="/ingredients/:ingredientID" element={<IngredientExpanded/>}/>
            <Route path="/locations" element={<LocationsList/>}/>
            <Route path="/locations/:locationID" element={<LocationExpanded/>}/>
            <Route path="*" element={<FileNotFound />}/>
        </Routes>
      </div>
    )
  }