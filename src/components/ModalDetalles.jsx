import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import TableDetalles from "./tables/TableDetalles";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import "../styles/modalDetalles.css";
import axios from "axios";
import { MyContext } from "../context/StateDataContext";
import dayjs from "dayjs";

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

export default function ModalDetalles({ pedido }) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [debe, setDebe] = React.useState(false);
  let entregado = pedido.fueEntregado?.entregado;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let detalles = pedido.detallesPedido;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const entregarPedido = async (pedido) => {
    if (debe) {
      pedido.debe = {
        debe: true,
        monto: debe,
      };
    }
    try {
      const response = await axios.put(
        `http://localhost:3001/Pedidos/entregarPedido/${pedido._id}`,
        pedido
      );
      const updatedData = [response.data];
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const cobrarDeuda = async (pedido) =>{
    pedido.debe = {
      debe: false,
      monto: pedido.debe.monto,
    };
    try {
      const response = await axios.put(
        `http://localhost:3001/Pedidos/entregarPedido/${pedido._id}`,
        pedido
      );
      const updatedData = [response.data];
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddToPhotosIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalles del pedido
          </Typography>
          {pedido?.detallesPedido && (
            <TableDetalles pedidos={detalles} debe={pedido.debe} />
          )}
          <div className="divDebe">
            {entregado !== "Entregado" ? (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      disabled={entregado === "Debe"}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Debe"
                />
                <div className="debeContainer">
                  {checked && (
                    <OutlinedInput
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      id="outlined-adornment-amount"
                      onChange={(event) => {
                        setDebe(event.target.value);
                      }}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  )}
                  <Button
                    className="cobrarButon"
                    onClick={() => {
                      if (entregado === "Debe") {
                        cobrarDeuda(pedido)
                      } else {
                        entregarPedido(pedido);
                      }
                    }}
                  >
                    Cobrar
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
