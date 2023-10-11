import React, { useEffect, useState, useContext } from "react";
import images from "../../helpers/images";
import { numberWithCommas } from "../../helpers/carrito";
import { collection, addDoc } from "firebase/firestore";
import db from "../../helpers/firebase";
import { toast } from "react-toastify";
import { Context } from "../../Context";
import "./style.css";

export default function Checkout({ vehiculos }) {
  let { carrito, setCarrito } = useContext(Context);
  let [vehiculosActuales, setVehiculosActuales] = useState([]);
  let [cantidadVehiculos, setCantidadVehiculos] = useState(0);
  let [totalCompra, setTotalCompra] = useState(0);

  const eliminarDelCarrito = (id) => {
    const arrayCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(arrayCarrito);
    parsearCarrito();
    toast("Producto eliminado del carrito exitosamente");
  };

  const confirmarCompra = async () => {
    if (carrito) {
      const docRef = await addDoc(collection(db, "orders"), {
        total: totalCompra,
      });
      setCarrito([]);
      setVehiculosActuales([]);
      setCantidadVehiculos(0);
      setTotalCompra(0);
      toast(
        `Felicidades, tu compra se ha realizado con exito! Nro. orden: ${docRef.id}`
      );
    }
  };

  const parsearCarrito = () => {
    let arrayCarrito = [];
    let total = 0;
    let cantidadVehiculos = 0;
    carrito.forEach((item) => {
      let vehiculo = vehiculos.find((vehiculo) => vehiculo.id === item.id);
      if (vehiculo) {
        arrayCarrito.push({
          ...vehiculo,
          cantidad: item.cantidad,
        });
        total += Number(vehiculo.precio * item.cantidad);
        cantidadVehiculos += item.cantidad;
      }
    });
    console.log(arrayCarrito);
    setVehiculosActuales(arrayCarrito);
    setCantidadVehiculos(cantidadVehiculos);
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
                <p>${numberWithCommas(vehiculo.precio * vehiculo.cantidad)}</p>
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
