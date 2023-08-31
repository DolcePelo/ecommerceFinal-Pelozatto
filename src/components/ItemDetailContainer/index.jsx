import React, { useEffect, useState } from "react";
import placeholderImage from "../../imagenes/placeholder.webp";
import { useParams } from "react-router-dom";
import "./index.css";

export default function ItemDetailContainer({ vehiculos, categorias }) {
  let { id } = useParams();
  let [vehiculoActual, setVehiculoActual] = useState();

  useEffect(() => {
    if (id) {
      const aux = vehiculos.find(
        (vehiculo) => vehiculo.id === Number(id)
      );
      setVehiculoActual(aux);
    }
  }, [id]);

  const renderItemCard = () => {
    if (vehiculoActual) {
      return (
        <div className="itemCard">
          <img src={placeholderImage} className="singleItemImg" />
          <div className="itemDetails">
            <p>{vehiculoActual.nombre}</p>
            <p>{categorias[vehiculoActual.categoria]}</p>
            <p>{vehiculoActual.detalles}</p>
            <p>{vehiculoActual.precio}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div className="categoriaTitulo">
        <p>{vehiculoActual && categorias[vehiculoActual.categoria]}</p>
      </div>
      {renderItemCard()}
    </div>
  );
}
