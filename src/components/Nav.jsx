import React, { useEffect, useState } from "react";
import '../styles/nav.css'
import Menu from "./Menu" 
export default function Nav() {
  return (
    <div className="navContainer nav">
        <div className="lavaderoText">Lavadero</div>
        <Menu />
    </div>
  );
}
