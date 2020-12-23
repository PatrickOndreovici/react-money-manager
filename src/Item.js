import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Item(props) {
  return (
    <div className="Item" style = {{backgroundColor: props.color}}>
        <FontAwesomeIcon onClick = {() => props.deleteItem(props.index)} icon={faTrash} />
        <h4 className = "nameOfItem">{props.nameOfItem}</h4>
        <h4 className = "costOfItem">{props.costOfItem}</h4>
        <h4 className = "currencyOfItem">{props.currencyOfItem}</h4>
    </div>
  );
}

export default Item;
