import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export default function LocationsList () {

    const [locations, setLocations] = useState([])
  
    let navigate = useNavigate()
    const showLocation = (locationID) => {
      navigate(`${locationID}`)
    }

    useEffect(()=>{
      const getData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/locations/`)
        console.log('data', response)
        
        //assign API results to array
        setLocations(response.data)
      }
      getData()
  
    },[])

    console.log(locations)
    
    if(!locations) {
        return <h1>Loading... please wait</h1>
    } else {
        return (
            <div className="objectList">
    
                {
                    locations.map((location, index) => (
                        <div key={index} 
                        className="objectItem"
                        onClick={() => showLocation(location.id)}
                        style={{
                            backgroundImage: `url(${location.image_url})`, 
                            // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${location.image_url})`, 
                            backgroundSize:'200px', 
                            backgroundPosition: '50% 50%'}} 
                        >
                            
                            <h2>{location.name}</h2>
                            {/* <h3>Author: {location.attributes.author}</h3> */}
                            {/* <h3>Summary: {location.attributes.summary}</h3> */}
                        </div>    
                    ))
                }
    
            </div>
        )

    }

  }