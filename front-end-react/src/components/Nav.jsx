import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav (props) {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleClick = (path) => {
        setActiveLink(path);
      };
    
    return (
      
    <div className="nav">
      <Link to="/" onClick={() => handleClick('/')}>
        <h2 className={activeLink === '/' ? 'navtext active' : 'navtext'}>Home</h2>
      </Link>
      <Link to="/ingredients" onClick={() => handleClick('/ingredients')}>
        <h2 className={activeLink === '/ingredients' ? 'navtext active' : 'navtext'}>Ingredients</h2>
      </Link>
      <Link to="/locations" onClick={() => handleClick('/locations')}>
        <h2 className={activeLink === '/locations' ? 'navtext active' : 'navtext'}>Locations</h2>
      </Link>
    </div>
    )
  }