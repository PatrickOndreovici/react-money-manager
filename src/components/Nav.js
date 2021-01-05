import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChartPie, faHistory} from '@fortawesome/free-solid-svg-icons'

function Nav(props) {
  const inactiveNavStyle = {
      color: "grey",
      textDecoration: "none"
  }
  const activeNavStyle = {
    color: "#0629C6",
    textDecoration: "none"
  }
  const styles = [inactiveNavStyle, inactiveNavStyle, inactiveNavStyle];
  styles[props.activeIndex] = activeNavStyle;
  return (
    <div className="navBar">
      <div className = "hamburger">
        <div className = "line"></div>
        <div className = "line"></div>
        <div className = "line"></div>
      </div>
      <div className = "navLinks">
        <ul>
            <Link style = {styles[0]} to = "/">
              <li> <FontAwesomeIcon icon={faHome} /> Dashboard</li>
            </Link>
            
            <Link style = {styles[1]} to = "graph">
              <li> <FontAwesomeIcon icon={faChartPie} /> Graph</li>
            </Link>

            <Link style = {styles[2]} to = "history">
              <li> <FontAwesomeIcon icon={faHistory} /> History</li>
            </Link>

        </ul>
      </div>
    </div>
  );
}

export default Nav
