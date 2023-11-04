import React, { useContext } from "react";
import imagenes from "../../config/images";
import { numberWithCommas } from "../../config/carrito";
import "./index.css";
import { Link } from "react-router-dom";
import { Context } from "../../Context";

export default function ListedItem({ producto, categorias }) {
  let { setOpenModalWithId } = useContext(Context);

  return (
    <div className="card">
      <img src={imagenes[producto.imagen]} className="itemImg" />
      <h2>{producto.nombre}</h2>
      <h2>{categorias[producto.categoria]}</h2>
      <h2>{producto.resumen}</h2>
      <h2>${numberWithCommas(producto.precio)}</h2>
      <div className="cardButtons">
        <div className="button">
          <Link to={`/item/${producto.id}`}>Ver mas</Link>
        </div>
        <div className="button" onClick={() => setOpenModalWithId(producto.id)}>
          <p>Agregar al carrito</p>
        </div>
      </div>
    </div>
  );
}
