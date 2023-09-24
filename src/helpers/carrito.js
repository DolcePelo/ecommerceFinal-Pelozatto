import { toast } from "react-toastify";

export const agregarCarrito = (id) => {
  let carrito = localStorage.getItem("carrito") ?? "";
  if (carrito === undefined || carrito === "") {
    carrito += id;
    localStorage.setItem("carrito", carrito);
  } else {
    carrito += "," + id;
    localStorage.setItem("carrito", carrito);
  }
  toast("Instrumento agregado al carrito de compra");
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
