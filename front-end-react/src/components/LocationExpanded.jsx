import { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'


export default function LocationExpanded (props) {

  const [location, setLocation] = useState('')

  let {locationID} = useParams() 

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/locations/${locationID}`)
      console.log('data', response)
      
      //assign API results to array
      setLocation(response.data)
    }
    getData()

  }, [props.locations, locationID])

  return location ? (
    <div className="expandedItem">
      <Link to ='/locations' 
      style={{ textDecoration: 'none', color: 'black'}}
      >
        <div
              className="hover-yellow"
              >
      Back to locations

        </div>
      </Link>
        <br/>
      <div className='expandedBody'>
        <div className='expandedText'>
        <h2>{location.name}</h2>
        <h3>{location.address}</h3>


        </div>
        <div className='expandedImageContainer'>
        <img src = {location.image_url}/>

        </div>
      </div>
    </div>
  ) 
  :     <div> 
            <div className='home'>  
            <h2>location not found</h2>
            <Link to ='/locations' className='navtext'>Back to locations</Link>
            </div> 
        </div>
}

