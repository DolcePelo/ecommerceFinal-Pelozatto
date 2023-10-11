import React, { useContext } from "react";
import imagenes from "../../helpers/images";
import { numberWithCommas } from "../../helpers/carrito";
import "./index.css";
import { Link } from "react-router-dom";
import { Context } from "../../Context";

export default function ListedItem({ vehiculo, categorias }) {
  let { setOpenModalWithId } = useContext(Context);

  return (
    <div className="card">
      <img src={imagenes[vehiculo.imagen]} className="itemImg" />
      <h2>{vehiculo.nombre}</h2>
      <h2>{categorias[vehiculo.categoria]}</h2>
      <h2>{vehiculo.resumen}</h2>
      <h2>${numberWithCommas(vehiculo.precio)}</h2>
      <div className="cardButtons">
        <div className="button">
          <Link to={`/item/${vehiculo.id}`}>Ver mas</Link>
        </div>
        <div className="button" onClick={() => setOpenModalWithId(vehiculo.id)}>
          <p>Agregar al carrito</p>
        </div>
      </div>
    </div>
  );
}
