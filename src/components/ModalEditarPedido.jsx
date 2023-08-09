import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "../styles/modalEditarPedido.css";
import { MyContext } from "../context/StateDataContext";
import axios from 'axios';

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

export default function BasicModal({ pedido }) {
  const [open, setOpen] = React.useState(false);
  const [nuevoPedido, setNuevoPedido] = React.useState(pedido);
  const general = useContext(MyContext);
  const precios = general.precios?.data?.[0];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [services, setServices] = useState(nuevoPedido.detallesPedido);

  const editarPedido = async (newData) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/Pedidos/${nuevoPedido._id}`,
        newData
      );
      const updatedData = [response.data];
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

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

    setNuevoPedido((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDate) => {
    setNuevoPedido((prevDatos) => ({
      ...prevDatos,
      fechaEntrega: dayjs(selectedDate),
    }));
  };

  const calcularPrecio = (servicio) => {
    servicio.precio = precios && precios[servicio.servicio] * servicio.cantidad;
  };
  const sendData = () => {
    services.forEach((element) => {
      calcularPrecio(element);
    });
    nuevoPedido.detallesPedido = services;

    editarPedido(nuevoPedido)
  };

  return (
    <div>
      <EditIcon color="primary" onClick={handleOpen}>
        Open modal
      </EditIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus 
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="titulo"
          >
            Editar pedido
          </Typography>
          <TextField
            defaultValue={nuevoPedido.nombre}
            label="Nombre"
            name="nombre"
            onChange={handleInputChange}
          />
          <div>
            {services?.map((service, index) => (
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
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button className="buttonMas" onClick={addService}>
                  +
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={() => removeService(index)}
                >
                  -
                </Button>
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
                value={dayjs(nuevoPedido.fechaEntrega)}
                onChange={(newValue) => handleDateChange(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="buttonEnviarModal">
            <Button onClick={() => sendData()}>Editar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
