import React from "react";
import placeholderImage from "../../imagenes/placeholder.webp";
import "./index.css";
import { Link } from "react-router-dom";

export default function ListedItem({ vehiculo, categorias }) {
  return (
    <div className="card">
      <img src={placeholderImage} className="itemImg" />
      <h2>{vehiculo.nombre}</h2>
      <h2>{categorias[vehiculo.categoria]}</h2>
      <h2>{vehiculo.resumen}</h2>
      <h2>{vehiculo.precio}</h2>
      <div className="button"><Link to={`/item/${vehiculo.id}`}>Ver mas</Link></div>
    </div>
  );
}
