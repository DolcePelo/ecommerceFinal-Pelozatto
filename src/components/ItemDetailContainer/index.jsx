import React, { useEffect, useState, useContext } from "react";
import placeholderImage from "../../imagenes/placeholder.webp";
import { useParams } from "react-router-dom";
import { numberWithCommas } from "../../helpers/carrito";
import { Context } from "../../Context";
import imagenes from "../../helpers/images";
import "./index.css";

export default function ItemDetailContainer({ vehiculos, categorias }) {
  let { id } = useParams();
  let [vehiculoActual, setVehiculoActual] = useState();
  let { setOpenModalWithId } = useContext(Context);

  useEffect(() => {
    if (id) {
      const aux = vehiculos.find((vehiculo) => vehiculo.id === id);
      setVehiculoActual(aux);
    }
  }, [id]);

  const renderItemCard = () => {
    if (vehiculoActual) {
      return (
        <div className="itemCard">
          <img src={imagenes[vehiculoActual.imagen]} className="singleItemImg" />
          <div className="itemDetails">
            <p>{vehiculoActual.nombre}</p>
            <p>{categorias[vehiculoActual.categoria]}</p>
            <p>{vehiculoActual.detalles}</p>
            <p>${numberWithCommas(vehiculoActual.precio)}</p>
            <div
              className="button"
              onClick={() => setOpenModalWithId(vehiculoActual.id)}
            >
              <p>Agregar al carrito</p>
            </div>
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
