import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { agregarCarrito } from "../../helpers/carrito";
import { Context } from "../../Context";
import "./index.css";

export default function ModalCart() {
  let { carrito, setCarrito, openModalWithId, setOpenModalWithId } =
    useContext(Context);
  let [cantidad, setCantidad] = useState(1);

  const closeModal = (agregarAlCarrito, cantidad = 0) => {
    if (agregarAlCarrito) {
      agregarCarrito(carrito, setCarrito, openModalWithId, cantidad);
    }
    setOpenModalWithId();
  };

  return (
    <div className="overlayModal">
      <div className="modalCard">
        <div className="titulo">
          <h1>Agregar producto al carrito</h1>
        </div>
        <div className="contenido">
          <p>Por favor seleccione una cantidad</p>
          <div className="cantidadSelector">
            <button
              className="cantidadButtton"
              onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <div className="cantidad">
              <p>{cantidad}</p>
            </div>
            <button
              className="cantidadButtton"
              onClick={() => setCantidad(cantidad + 1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <div className="confirmacion">
          <button
            className="botonConfirmacion"
            onClick={() => closeModal(false)}
          >
            Cancelar
          </button>
          <button
            className="botonConfirmacion"
            onClick={() => closeModal(true, cantidad)}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
