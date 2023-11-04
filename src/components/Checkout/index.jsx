import React, { useEffect, useState, useContext } from "react";
import images from "../../config/images";
import { numberWithCommas } from "../../config/carrito";
import { collection, addDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { toast } from "react-toastify";
import { Context } from "../../Context";
import "./style.css";

export default function Checkout({ productos }) {
  let { carrito, setCarrito } = useContext(Context);
  let [productosActuales, setproductosActuales] = useState([]);
  let [cantidadproductos, setCantidadproductos] = useState(0);
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
      setproductosActuales([]);
      setCantidadproductos(0);
      setTotalCompra(0);
      toast(
        `Felicidades, tu compra se ha realizado con exito! Nro. orden: ${docRef.id}`
      );
    }
  };

  const parsearCarrito = () => {
    let arrayCarrito = [];
    let total = 0;
    let cantidadproductos = 0;
    carrito.forEach((item) => {
      let bien = productos.find((bien) => bien.id === item.id);
      if (bien) {
        arrayCarrito.push({
          ...bien,
          cantidad: item.cantidad,
        });
        total += Number(bien.precio * item.cantidad);
        cantidadproductos += item.cantidad;
      }
    });
    console.log(arrayCarrito);
    setproductosActuales(arrayCarrito);
    setCantidadproductos(cantidadproductos);
    setTotalCompra(total);
  };

  useEffect(() => {
    parsearCarrito();
  }, []);
  return (
    <div className="container">
      <div className="checkoutContainer">
        <div className="title">
          <h1>Tu carrito ({cantidadproductos})</h1>
          <hr />
        </div>
        {productosActuales.map((bien) => {
          console.log(bien);
          return (
            <div className="itemCheckout">
              <div className="itemImagen">
                <img src={images[bien.imagen]} className="itemImg" />
              </div>
              <div className="itemDetalles">
                <p>{bien.nombre}</p>
                <p>{bien.detalles}</p>
                <p>Cantidad: {bien.cantidad}</p>
                <button onClick={() => eliminarDelCarrito(bien.id)}>
                  Eliminar
                </button>
              </div>
              <div className="itemPrecio">
                <p>${numberWithCommas(bien.precio * bien.cantidad)}</p>
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
