import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { MyContext } from "../context/StateDataContext"
// import StateDataContext from '../context/StateDataContext';
import axios from 'axios';

import "../styles/modalCrearPedido.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minQidth: "40vw",
  width: "max-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const general = useContext(MyContext);
  const { data, setData } = general;
  const precios = general.precios?.data?.[0]

  const crearPedido = async (newData) => {
    try {
      const response = await axios.post('http://localhost:3001/Pedidos', newData);
      const updatedData = [response.data];
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const [services, setServices] = useState([
    { servicio: "valet", cantidad: 1 },
  ]);

  const [pedido, setPedido] = useState({
    fechaEntrega: "",
    nombre: "",
    detallesPedido: null,
  });

  const addService = (servicio) => {
    setServices([...services, { servicio: "valet", cantidad: 1 }]);
  };

  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleQuantityChange = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index]["cantidad"] = +value;
    setServices(updatedServices);
  };

  const handleServiceChange = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index]["servicio"] = value;
    setServices(updatedServices);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPedido((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDate) => {
    setPedido((prevDatos) => ({
      ...prevDatos,
      fechaEntrega: dayjs(selectedDate),
    }));
  };

  const calcularPrecio = (servicio) => {
      servicio.precio = precios && precios[servicio.servicio] * servicio.cantidad;
  }

  const sendData = () => {
    services.forEach(element => {
      calcularPrecio(element)
    });
    pedido.detallesPedido = services;
    pedido.fechaPedido = dayjs(dayjs(), 'DD/MM/YYYY').format('YYYY-MM-DD');
    pedido.fechaEntrega = dayjs(pedido.fechaEntrega);

    setPedido(pedido)
    crearPedido(pedido)
  }

  return (
    <div>
      <Button onClick={handleOpen}>Nuevo pedido +</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nuevo pedido
          </Typography>
          <div>
            <div className="divModalCP">
              <TextField
                id="outlined-basic"
                label="Nombre"
                name="nombre"
                variant="outlined"
                value={pedido.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              {services.map((service, index) => (
                <div>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={service.servicio}
                    label="servicio"
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    className="selectModal"
                  >
                    <MenuItem value={"lavado"}>Lavado</MenuItem>
                    <MenuItem value={"valet"}>Valet</MenuItem>
                    <MenuItem value={"secado"}>Secado</MenuItem>
                    <MenuItem value={"plaza"}>Acolchado plaza</MenuItem>
                    <MenuItem value={"dosPlazas"}>Acolchado 2 plazas </MenuItem>
                    <MenuItem value={"dosPlazasYMedia"}>
                      Acolchado 2 plazas y media
                    </MenuItem>
                    <MenuItem value={"plumas"}>Acolchado plumas</MenuItem>
                  </Select>
                  <TextField
                    id="outlined-number"
                    label="Cantidad"
                    type="number"
                    className="numberSelectModal"
                    value={service.cantidad}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button className="buttonMas" onClick={addService}>+</Button>
                  <Button disabled={index === 0} onClick={() => removeService(index)}>-</Button>
                </div>
              ))}
            </div>
            <div className="divModalCP">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                // shouldDisableDate={dayjs()}
                className="selectModal"
              >
                <DatePicker
                  label="Fecha de entrega"
                  value={pedido.fechaEntrega}
                  onChange={(newValue) => handleDateChange(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="buttonEnviarModal">
            <Button onClick={()=>sendData()}>Enviar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
