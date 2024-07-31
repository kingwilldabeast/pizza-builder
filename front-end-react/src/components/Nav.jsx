import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav (props) {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    useEffect(() => {
      setActiveLink(location.pathname);
    }, [location.pathname]);

    const handleClick = (path) => {
        setActiveLink(path);
      };
    
    return (
      
    <div className="nav">
      <Link to="/" onClick={() => handleClick('/')}
       style={{ textDecoration: 'none' }}
      >
        <h2 className={activeLink === '/' ? 'navtext active' : 'navtext'}>Home</h2>
      </Link>
      <Link to="/locations" onClick={() => handleClick('/locations')}
      style={{ textDecoration: 'none' }}
      >
        <h2 className={activeLink === '/locations' ? 'navtext active' : 'navtext'}>Locations</h2>
      </Link>
      <Link to="/ingredients" onClick={() => handleClick('/ingredients')}
      style={{ textDecoration: 'none' }}
      >
        <h2 className={activeLink === '/ingredients' ? 'navtext active' : 'navtext'}>Ingredients</h2>
      </Link>

      <Link to="/newpizza" onClick={() => handleClick('/newpizza')}
      style={{ textDecoration: 'none' }}
      >
        <h2 className={activeLink === '/newpizza' ? 'navtext active' : 'navtext'}>Order Pizza</h2>
      </Link>




    </div>
    )
  }