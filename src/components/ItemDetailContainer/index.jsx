import React, { useEffect, useState, useContext } from "react";
import placeholderImage from "../../imagenes/placeholder.webp";
import { useParams } from "react-router-dom";
import { numberWithCommas } from "../../config/carrito";
import { Context } from "../../Context";
import imagenes from "../../config/images";
import "./index.css";

export default function ItemDetailContainer({ productos, categorias }) {
  let { id } = useParams();
  let [productoActual, setproductoActual] = useState();
  let { setOpenModalWithId } = useContext(Context);

  useEffect(() => {
    if (id) {
      const aux = productos.find((producto) => producto.id === id);
      setproductoActual(aux);
    }
  }, [id]);

  const renderItemCard = () => {
    if (productoActual) {
      return (
        <div className="itemCard">
          <img src={imagenes[productoActual.imagen]} className="singleItemImg" />
          <div className="itemDetails">
            <p>{productoActual.nombre}</p>
            <p>{categorias[productoActual.categoria]}</p>
            <p>{productoActual.detalles}</p>
            <p>${numberWithCommas(productoActual.precio)}</p>
            <div
              className="button"
              onClick={() => setOpenModalWithId(productoActual.id)}
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
        <p>{productoActual && categorias[productoActual.categoria]}</p>
      </div>
      {renderItemCard()}
    </div>
  );
}
