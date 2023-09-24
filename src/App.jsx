import NavBar from "./components/NavBar";
import ItemsListContainer from "./components/ItemsListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Checkout from "./components/Checkout";
import db from "./helpers/firebase";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    //Cargar vehiculos
    fetchData();
  }, []);

  const fetchData = async () => {
    const q = query(collection(db, "vehiculos"));
    const data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let vehiculo = {
        id: doc.id,
        ...doc.data(),
      };
      data.push(vehiculo);
      console.log(doc.id, " => ", doc.data());
    });
    setVehiculos(data);
  };

  const categorias = ["Motos", "Cuatriciclos"];

  return (
    <div className="body">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          Component={(props) => (
            <ItemsListContainer
              vehiculos={vehiculos}
              categorias={categorias}
              {...props}
            />
          )}
        />
        <Route
          path="/category/:id"
          Component={(props) => (
            <ItemsListContainer
              vehiculos={vehiculos}
              categorias={categorias}
              {...props}
            />
          )}
        />
        <Route
          path="/item/:id"
          Component={(props) => (
            <ItemDetailContainer
              vehiculos={vehiculos}
              categorias={categorias}
              {...props}
            />
          )}
        />
        <Route
          path="/checkout/"
          Component={(props) => <Checkout vehiculos={vehiculos} {...props} />}
        />
      </Routes>
    </div>
  );
}

export default App;
