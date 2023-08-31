import React, { useEffect, useState } from "react";
import ListedItem from "../ListedItem";
import "./style.css";
import { useParams } from "react-router-dom";

export default function ItemsListContainer({ vehiculos, categorias }) {
  let { id } = useParams();
  console.log(vehiculos)
  let [vehiculosActuales, setVehiculosActuales] = useState(vehiculos);

  useEffect(() => {
    if (id) {
      const aux = vehiculos.filter(
        (vehiculo) => vehiculo.categoria === Number(id)
      );
      setVehiculosActuales(aux);
    }
  }, [id]);

  return (
    <div className="container">
      <p className="categoria">{id ? categorias[id] : "Vehiculos"}</p>
      <div className="listado">
        {vehiculosActuales.map((vehiculo) => {
          return (
            <ListedItem vehiculo={vehiculo} categorias={categorias} />
          );
        })}
      </div>
    </div>
  );
}
