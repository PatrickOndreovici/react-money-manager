import './Categories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faTshirt, faUserFriends, faBrain, faHeartbeat, faSmile} from '@fortawesome/free-solid-svg-icons';

function Categories(props){
    const styles = new Array(6).fill(null);
    if (props.currentCategory != -1){
        styles[props.currentCategory] = {color: "#4398c9"};
    }
    return (
        <div className = "Categories">
            <div style = {styles[0]} onClick = {() => {props.setCurrentCategory(0)}}><FontAwesomeIcon icon={faUtensils} /> Food</div>
            <div style = {styles[1]} onClick = {() => {props.setCurrentCategory(1)}}><FontAwesomeIcon icon={faTshirt} /> Clothes</div>
            <div style = {styles[2]} onClick = {() => {props.setCurrentCategory(2)}}><FontAwesomeIcon icon={faUserFriends} /> Social life</div>
            <div style = {styles[3]} onClick = {() => {props.setCurrentCategory(3)}}><FontAwesomeIcon icon={faBrain} /> Self development</div>
            <div style = {styles[4]} onClick = {() => {props.setCurrentCategory(4)}}><FontAwesomeIcon icon={faHeartbeat} /> Health</div>
            <div style = {styles[5]} onClick = {() => {props.setCurrentCategory(5)}}><FontAwesomeIcon icon={faSmile} /> Other</div>
        </div>
    )
}

export default Categories;