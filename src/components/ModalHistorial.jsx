import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableMovimientos from "./tables/TableMovimientos";
import dayjs from "dayjs";
import axios from "axios";
import { MyContext } from "../context/StateDataContext";
import "../styles/modalHistorial.css"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [rango, setRango] = React.useState("ultimoMes");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const general = useContext(MyContext);
  const [gastos, setGatos] = React.useState(general.gastos);
  const [ingresos, setIngresos] = React.useState(general.ingresos);

  console.log({ general });
  const rangos = {
    ultimoMes: {
      desde: dayjs().subtract(1, "month").startOf("month"),
      hasta: dayjs().subtract(1, "month").endOf("month") + 1,
    },
    ultimaSemana: {
      desde: dayjs().subtract(7, "day").startOf("day"),
      hasta: dayjs().endOf("day") + 1,
    },
    "30Dias": {
      desde: dayjs().subtract(30, "day").startOf("day"),
      hasta: dayjs().endOf("day") + 1,
    },
  };
  
  const handleChangeRango = (e) => {
    setRango(e.target.value);
    console.log(dayjs(rangos[e.target.value].desde).format("DD-MM-YYYY"));

    const desde = dayjs(rangos[e.target.value].desde).format("YYYY-MM-DD");
    const hasta = dayjs(rangos[e.target.value].hasta).format("YYYY-MM-DD");

    console.log({desde, hasta});
    axios
      .get(
        `http://localhost:3001/Movimientos/gastos/rango?desde=${desde}&hasta=${hasta}`
      )
      .then((response) => {
        setGatos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(
        `http://localhost:3001/Movimientos/ingresos/rango?desde=${desde}&hasta=${hasta}`
      )
      .then((response) => {
        setIngresos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMovimientosPorRango = (value) => {
    console.log(rangos[value].desde);
    // const desde = rangos[value].desde
    // const hasta = dayjs().subtract(1, "month").endOf("month");
    // axios
    //   .get(`http://localhost:3001/Movimientos/gastos/rango?desde=${desde}&hasta=${hasta}`)
    //   .then((response) => {
    //     setRows(response.data.docs);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Ver historial</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Historial
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              onChange={handleChangeRango}
              value={rango}
            >
              <MenuItem value={"ultimaSemana"}>Ultimos 7 dias</MenuItem>
              <MenuItem value={"ultimoMes"}>Ultimo mes</MenuItem>
              <MenuItem value={"30Dias"}>Ultimos 30 dias</MenuItem>
              {/* <MenuItem value={20}>Ultimo mes</MenuItem> */}
            </Select>
            <div className="containerTableMovimientos">
            <TableMovimientos data={gastos} />
            <TableMovimientos data={ingresos} />
            </div>
          </Typography>
          <Button onClick={() => setOpen(false)}>Cerral</Button>
        </Box>
      </Modal>
    </div>
  );
}
