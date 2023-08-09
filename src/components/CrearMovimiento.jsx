import React, { useState, useContext } from "react";
import { Select, MenuItem, TextField, Input } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import "../styles/modalBalance.css";
export default function CrearMovimiento() {
  const [movimiento, setMovimiento] = useState({
    tipo: "ingreso",
    monto: 0,
    descripcion: null,
  });

  const crearMovimiento = async (newData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/Movimientos",
        newData
      );
      const updatedData = [response.data];
      console.log(updatedData);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setMovimiento((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));

    console.log({ movimiento });
  };
  
  return (
    <div>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo"
            defaultValue={movimiento.tipo}
            className="divMontoTipo"
            name="tipo"
            onChange={handleOnChange}
          >
            <MenuItem value={"ingreso"}>Ingreso</MenuItem>
            <MenuItem value={"gasto"}>Gasto</MenuItem>
          </Select>
          <TextField
            className="divMontoTipo"
            id="outlined-number"
            label="monto"
            type="number"
            name="monto"
            value={movimiento.monto}
            onChange={handleOnChange}
          />
        </div>
        <div className="divDetalleMovimiento">
          <TextField
            id="outlined-basic"
            label="descripcion"
            name="descripcion"
            variant="outlined"
            className="textFieldCMovimiento"
            value={movimiento.descripcion}
            onChange={handleOnChange} 
          />
          <Button className="botonCrearMovimiento" onClick={() => crearMovimiento(movimiento)}>
            Crear movimiento
          </Button>
        </div>
    </div>
  );
}
