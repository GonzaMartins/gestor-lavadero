import React, { useState } from "react";
import ModalDetalles from "../ModalDetalles";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import axios from "axios";
// import '../../styles/tableParaEntregar.css'

export default function BasicTable({ data }) {

  const [rows, setRows] = useState(data?.entregados?.docs)
  const CustomNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <div>No se encontró ninguna información</div>
      </GridOverlay>
    );
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
      valueGetter: (row) =>
      row.row?.fueEntregado?.entregado,
    },
    {
      field: "detalles",
      headerName: "detalles",
      renderCell: (row) => {
        return <ModalDetalles pedido={row.row} />;
      },
    },
  ];

  const getRows = () => {
    return rows
  };

  return (
    <DataGrid
      rows={getRows()}
      slots={{
        noRowsOverlay: CustomNoRowsOverlay,
      }}
      columns={columns}
      style={{ backgroundColor: "white" }}
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
  );
}
