import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping} from "@fortawesome/free-solid-svg-icons";
import './style.css'

export default function CartWidget() {
    //Hacer dinamico en un futuro
    const contador=0;
  return (
    <div className='carrito'>
      <FontAwesomeIcon icon={faCartShopping} />
      <p>{contador}</p>
    </div>
  )
}
