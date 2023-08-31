import React from "react";
import "./index.css"
import { Link } from "react-router-dom";

export default function Dropdown() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="container">
      <button onClick={handleOpen}>Productos</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <Link to={"/category/0"} onClick={() => setOpen(!open)}>Motos</Link>
          </li>
          <li className="menu-item">
            <Link to={"/category/1"} onClick={() => setOpen(!open)}>Cuatriciclos</Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
