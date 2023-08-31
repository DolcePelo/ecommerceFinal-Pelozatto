import NavBar from "./components/NavBar";
import ItemsListContainer from "./components/ItemsListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  const vehiculos = [
    {
      id: 10,
      nombre: "Benelli Leoncino 250",
      imagen: "",
      detalles:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      resumen: "Es una moto",
      categoria: 0,
      precio: "1.000.000",
    },
    {
      id: 11,
      nombre: "Can Am Defender 900 Dps",
      imagen: "",
      detalles:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      resumen: "Es un cuatriciclo",
      categoria: 1,
      precio: "3.000.000",
    }
  ];

  const categorias = ["Motos", "Cuatriciclos"];

  return (
    <div className="body">
      <NavBar />
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
      </Routes>
    </div>
  );
}

export default App;
