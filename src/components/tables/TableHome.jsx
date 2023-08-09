import React from 'react';
import ModalDetalles from '../ModalDetalles'
import ModalEditarPedido from '../ModalEditarPedido'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


export default function BasicTable({data}) {

  const getRowId = (row) => row.id? row.id : row._id 
  const columns = [
    { field: 'nombre', headerName: 'Nombre' },
    { field: '_id', headerName: 'ID' },
    { field: 'fechaPedido', headerName: 'Fecha pedido', 
    valueGetter: (row) =>
      row.row.fechaPedido?.slice(0, 10), },
    {
      field: 'fechaEntrega',
      headerName: 'Fecha entrega',
      valueGetter: (row) =>
      row.row.fechaEntrega?.slice(0, 10),
    },
    {
      field: 'precioTotal',
      headerName: 'Precio Total',
    },
    {
      field: 'Entregado',
      headerName: 'Estado',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      valueGetter: (row) =>
      row.row?.fueEntregado?.entregado,
    },
    {
      field: 'detalles',
      headerName: 'detalles',
      renderCell: (row) => { return <ModalDetalles pedido={row.row} />},
    },
    {
      field: 'editar',
      headerName: 'editar',
      renderCell: (row) => { return <ModalEditarPedido pedido={row.row} />},
    },
  ];
  
  return (
    <DataGrid
      rows={data?.pedidos?.docs ?  data.pedidos.docs : [{id: 12}]}
      columns={columns}
      getRowId={getRowId}
      style={{backgroundColor: 'white'}}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
        sorting: {
          sortModel: [{ field: 'fechaPedido', sort: 'desc' }],
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}