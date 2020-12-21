import './App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'

function Nav() {

  const navStyle = {
      color: "#0629C6",
      textDecoration: "none"
  }
  return (
    <div className="navBar">
      <ul>
          <Link style = {navStyle} to = "/">
            <li> <FontAwesomeIcon icon={faHome} /> Dashboard</li>
          </Link>
          
          <Link style = {navStyle} to = "graph">
            <li> <FontAwesomeIcon icon={faChartPie} /> Graph</li>
          </Link>

      </ul>
    </div>
  );
}

export default Nav
