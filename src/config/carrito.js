import { toast } from "react-toastify";

export const agregarCarrito = (carrito, setCarrito, id, cantidad) => {
  let carritoTemporal = carrito;

  const existe = carritoTemporal.findIndex((item) => {
    return id === item.id;
  });

  if (existe != -1) {
    carritoTemporal[existe] = {
      id: id,
      cantidad: carritoTemporal[existe].cantidad + cantidad,
    };
    setCarrito(carritoTemporal);
  } else {
    carritoTemporal.push({
      id: id,
      cantidad: cantidad,
    });
    setCarrito(carritoTemporal);
  }
  toast("producto agregado al carrito de compra");
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
