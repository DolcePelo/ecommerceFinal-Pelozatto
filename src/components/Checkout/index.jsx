import React, { useEffect, useState } from "react";
import images from "../../helpers/images";
import { numberWithCommas } from "../../helpers/carrito";
import { toast } from "react-toastify";
import "./style.css";

export default function Checkout({ vehiculos }) {
  let [vehiculosActuales, setVehiculosActuales] = useState([]);
  let [cantidadVehiculos, setCantidadVehiculos] = useState(0);
  let [totalCompra, setTotalCompra] = useState(0);

  const eliminarDelCarrito = (id) => {
    const carrito = localStorage.getItem("carrito") ?? "";
    let idsCarrito = carrito.split(",");
    const arrayCarrito = idsCarrito.filter((itemId) => itemId !== id);
    localStorage.setItem("carrito", arrayCarrito);
    parsearCarrito();
    toast("Producto eliminado del carrito exitosamente");
  };

  const confirmarCompra = () => {
    let carrito = localStorage.getItem("carrito") ?? "";
    if (carrito) {
      localStorage.removeItem("carrito");
      setVehiculosActuales([]);
      setCantidadVehiculos(0);
      setTotalCompra(0);
      toast("Felicidades, tu compra se ha realizado con exito");
    }
  };

  const parsearCarrito = () => {
    let carrito = localStorage.getItem("carrito") ?? "";
    let arrayCarrito = [];
    let total = 0;
    let idsCarrito = carrito.split(",");
    if (carrito !== "") {
      setCantidadVehiculos(idsCarrito.length);
    } else {
      setCantidadVehiculos(0);
    }
    idsCarrito.forEach((id) => {
      let exists = arrayCarrito.findIndex((item) => item.id === id.toString());
      if (exists >= 0) {
        console.log(exists);
        arrayCarrito[exists] = {
          ...arrayCarrito[exists],
          cantidad: arrayCarrito[exists].cantidad + 1,
        };
        total += Number(arrayCarrito[exists].precio);
      } else {
        let vehiculo = vehiculos.find(
          (item) => item.id === id.toString()
        );
        if (vehiculo) {
          arrayCarrito.push({
            ...vehiculo,
            cantidad: 1,
          });
          total += Number(vehiculo.precio);
        }
      }
    });
    console.log(arrayCarrito);
    setVehiculosActuales(arrayCarrito);
    setTotalCompra(total);
  };

  useEffect(() => {
    parsearCarrito();
  }, []);
  return (
    <div className="container">
      <div className="checkoutContainer">
        <div className="title">
          <h1>Tu carrito ({cantidadVehiculos})</h1>
          <hr />
        </div>
        {vehiculosActuales.map((vehiculo) => {
          console.log(vehiculo);
          return (
            <div className="itemCheckout">
              <div className="itemImagen">
                <img src={images[vehiculo.imagen]} className="itemImg" />
              </div>
              <div className="itemDetalles">
                <p>{vehiculo.nombre}</p>
                <p>{vehiculo.detalles}</p>
                <p>Cantidad: {vehiculo.cantidad}</p>
                <button onClick={() => eliminarDelCarrito(vehiculo.id)}>
                  Eliminar
                </button>
              </div>
              <div className="itemPrecio">
                <p>
                  ${numberWithCommas(vehiculo.precio * vehiculo.cantidad)}
                </p>
              </div>
            </div>
          );
        })}
        <div className="total">
          <hr />
          <p>Total ${numberWithCommas(totalCompra)}</p>
          <button className="confirmar" onClick={() => confirmarCompra()}>
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}
