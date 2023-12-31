import React from "react";
import CartWidget from "../CartWidget";
import { ReactComponent as ReactLogo } from "../../imagenes/logovector.svg";
import "./style.css";
import Dropdown from "../Dropdown";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="NavBarContainer">
      <div className="Logo">
        <Link to="/">
          <ReactLogo />
        </Link>
      </div>
      <div className="nav">
        <Dropdown />
      </div>
      <div>
        <CartWidget />
      </div>
    </div>
  );
  
}
