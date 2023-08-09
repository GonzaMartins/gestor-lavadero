import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MyContext } from "../context/StateDataContext";
import CrearMovimiento from "./CrearMovimiento";
import ModalHistorial from "./ModalHistorial"

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
  textAlign: 'center'
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const general = useContext(MyContext);
  const balance = general.balance.data[0];

  return (
    <div>
      <Button onClick={handleOpen}>​Balance</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus 
      >
        <Box sx={style} >
          <div >
          <h1 id="modal-modal-title" variant="h3" component="h2">
            Balance
          </h1>
          <h3>
            {balance.total}
          </h3>
          </div>
          <div>
            <ModalHistorial />
          </div>
          <div>
          <CrearMovimiento />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
