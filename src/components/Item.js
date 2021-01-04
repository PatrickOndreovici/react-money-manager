import './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { findAllByDisplayValue } from '@testing-library/react';

function Item(props) {
  return (
    <div className="Item" style = {{backgroundColor: props.color}}>
        <div className = "deleteButton">
          <FontAwesomeIcon onClick = {() => props.deleteItem(props.index)} icon={faTrash} />
        </div>
        <h4 className = "nameOfItem">{props.nameOfItem}</h4>
        <div style = {{display: "inline", float: "right"}}>
          <h4 className = "costOfItem">{props.costOfItem}</h4>
          <h4 className = "currencyOfItem">{props.currencyOfItem}</h4>
        </div>
    </div>
  );
}

export default Item;
