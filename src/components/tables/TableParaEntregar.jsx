import React, { useState } from "react";
import ModalDetalles from "../ModalDetalles";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ModalEditarPedido from "../ModalEditarPedido";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import axios from "axios";
import "../../styles/tableParaEntregar.css";
import Box from "@mui/material/Box";

export default function BasicTable({ data }) {
  const [rows, setRows] = useState(data?.pedidosHoy);
  const [value, setValue] = useState(dayjs());
  const [switchDate, setSwitchDate] = useState(false);
  const [pedidosPorFehca, setPedidosPorFecha] = useState(null);

  const customDatePickerStyles = {
    "& .MuiInputBase-root": {
      color: "white", // Cambiar el color del texto a blanco
      backgroundColor: "transparent", // Hacer el fondo transparente
    },
    "& .MuiPickersDay-daySelected": {
      backgroundColor: "white", // Cambiar el color de fondo cuando se selecciona un día
      color: "black", // Cambiar el color del texto del día seleccionado
    },
    "& .MuiOutlinedInput-notchedOutline:before": {
      borderColor: "white !important", // Cambiar el color de los bordes del DatePicker
    },
    "& .MuiSlider-root": {
      color: '#20b2aa'
    }
  };
  const getPedidosPorFecha = (date) => {
    axios
      .get(`http://localhost:3001/Pedidos/porFecha?fecha=${date}`)
      .then((response) => {
        setRows(response.data.docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getRowId = (row) => (row.id ? row.id : row._id);
  const columns = [
    { field: "nombre", headerName: "Nombre" },
    { field: "_id", headerName: "ID" },
    {
      field: "fechaPedido",
      headerName: "Fecha pedido",
      valueGetter: (row) => row.row.fechaPedido?.slice(0, 10),
    },
    {
      field: "fechaEntrega",
      headerName: "Fecha entrega",
      valueGetter: (row) => row.row.fechaEntrega?.slice(0, 10),
    },
    {
      field: "precioTotal",
      headerName: "Precio Total",
    },
    {
      field: "Entregado",
      headerName: "Estado",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (row) => row.row?.fueEntregado?.entregado,
    },
    {
      field: "detalles",
      headerName: "detalles",
      renderCell: (row) => {
        return <ModalDetalles pedido={row.row} />;
      },
    },
    {
      field: "editar",
      headerName: "editar",
      renderCell: (row) => {
        return <ModalEditarPedido pedido={row.row} />;
      },
    },
  ];

  const handleSwitchChange = (event) => {
    setSwitchDate(event.target.checked);
  };

  const handlePickerChange = (value) => {
    setValue(value);
    getPedidosPorFecha(value);
  };

  const getRows = () => {
    if (switchDate) {
      return rows;
    } else if (!switchDate) {
      return data.sinEntregar.docs;
    }
  };
  
  return (
    <div>
      <div className="selectDateContainer">
        <Switch onChange={handleSwitchChange} value={switchDate} />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          // shouldDisableDate={dayjs()}
          className="selectModal"
        >
          <DatePicker
            label="Seleccionar fecha"
            value={value}
            onChange={(newValue) => handlePickerChange(newValue)}
            disabled={!switchDate}
            // className="custom-date-picker" 
            // sx={customDatePickerStyles}
          />
        </LocalizationProvider>
      </div>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={getRows()}
          style={{ backgroundColor: "white" }}
          columns={columns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
            sorting: {
              sortModel: [{ field: "fechaPedido", sort: "desc" }],
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </div>
  );
}
