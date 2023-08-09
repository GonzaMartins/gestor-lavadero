import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MyContext } from "../context/StateDataContext";
import "../styles/modalPrecios.css";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalDetalles() {
  const [open, setOpen] = React.useState(false);
  const [editar, setEditar] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const general = useContext(MyContext);
  const [preciosActuales, setPrecios] = React.useState(
    general?.precios?.data[0]
  );
  let precios = general.precios?.data[0];

  const handleOnClickEditar = () => {
    setEditar(!editar);
  };

  const hanldeOnChange = (e) => {
    const { name, value } = e.target;
    setPrecios((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };

  const actualizarPrecios = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/Precios",
        preciosActuales
      );
      window.location.reload()  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>​Precios</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 id="modal-modal-title" variant="h3" component="h2">
              Precios
            </h1>
            <div className="containerPrecios">
              <div>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Lavado
                </InputLabel>
                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  onChange={(e) => hanldeOnChange(e)}
                  name="lavado"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.lavado}
                  variant="outlined"
                />
                <InputLabel htmlFor="outlined-adornment-amount">
                  Secado
                </InputLabel>
                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  name="secado"
                  onChange={(e) => hanldeOnChange(e)}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.secado}
                  variant="outlined"
                />
                <InputLabel htmlFor="outlined-adornment-amount">
                  Valet
                </InputLabel>

                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  name="valet"
                  onChange={(e) => hanldeOnChange(e)}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.valet}
                  variant="outlined"
                />
                <InputLabel htmlFor="outlined-adornment-amount">
                  Planchado
                </InputLabel>

                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  name="planchado"
                  onChange={(e) => hanldeOnChange(e)}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.planchado}
                  variant="outlined"
                />
              </div>
              <div>
                <InputLabel htmlFor="outlined-adornment-amount">
                  1 plaza
                </InputLabel>

                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  name="plaza"
                  onChange={(e) => hanldeOnChange(e)}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.plaza}
                  variant="outlined"
                />
                <InputLabel htmlFor="outlined-adornment-amount">
                  2 plazas
                </InputLabel>

                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  name="dosPlazas"
                  onChange={(e) => hanldeOnChange(e)}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.dosPlazas}
                  variant="outlined"
                />
                <InputLabel htmlFor="outlined-adornment-amount">
                  Plumas
                </InputLabel>

                <Input
                  id="outlined-basic"
                  className="InputModal"
                  readOnly={!editar}
                  name="plumas"
                  onChange={(e) => hanldeOnChange(e)}
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  defaultValue={precios.plumas}
                  variant="outlined"
                />
              </div>
            </div>
            <div>Ultima actualizacion: {precios.updatedAt.slice(0,10)}</div>
            <Button onClick={handleOnClickEditar}>Editar</Button>
            {editar && <Button onClick={actualizarPrecios}>Aceptar!</Button>}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
