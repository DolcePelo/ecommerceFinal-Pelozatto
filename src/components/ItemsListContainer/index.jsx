import React, { useEffect, useState } from "react";
import ListedItem from "../ListedItem";
import "./style.css";
import { useParams } from "react-router-dom";

export default function ItemsListContainer({ productos, categorias }) {
  let { id } = useParams();
  console.log(productos)
  let [productosActuales, setproductosActuales] = useState(productos);

  useEffect(() => {
    if (id) {
      const aux = productos.filter(
        (producto) => producto.categoria === Number(id)
      );
      setproductosActuales(aux);
    }
  }, [id]);

  return (
    <div className="container">
      <p className="categoria">{id ? categorias[id] : "productos"}</p>
      <div className="listado">
        {productosActuales.map((producto) => {
          return (
            <ListedItem producto={producto} categorias={categorias} />
          );
        })}
      </div>
    </div>
  );
}
