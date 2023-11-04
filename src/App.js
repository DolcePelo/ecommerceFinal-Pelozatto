import NavBar from "./components/NavBar";
import ItemsListContainer from "./components/ItemsListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Checkout from "./components/Checkout";
import db from "./config/firebase";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import ModalCart from "./components/ModalCart";
import { Context } from "./Context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [productos, setproductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [openModalWithId, setOpenModalWithId] = useState();

  useEffect(() => {
    //Cargar Prendas
    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, "productos"));
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let bien = {
        id: doc.id,
        ...doc.data(),
      };
      data.push(bien);
      console.log(doc.id, " => ", doc.data());
    });
    setproductos(data);
  };

  const categorias = ["Prendas", "Joyas", "accesorios"];

  return (
    <div className="body">
      <Context.Provider
        value={{ carrito, setCarrito, openModalWithId, setOpenModalWithId }}
      >
        <NavBar />
        <ToastContainer />
        {openModalWithId && <ModalCart />}
        <Routes>
          <Route
            path="/"
            Component={(props) => (
              <ItemsListContainer
                productos={productos}
                categorias={categorias}
                {...props}
              />
            )}
          />
          <Route
            path="/category/:id"
            Component={(props) => (
              <ItemsListContainer
                productos={productos}
                categorias={categorias}
                {...props}
              />
            )}
          />
          <Route
            path="/item/:id"
            Component={(props) => (
              <ItemDetailContainer
                productos={productos}
                categorias={categorias}
                {...props}
              />
            )}
          />
          <Route
            path="/checkout/"
            Component={(props) => <Checkout productos={productos} {...props} />}
          />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
