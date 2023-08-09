import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'tipo', headerName: 'tipo' },
  { field: 'monto', headerName: 'monto' },
  { field: 'descripcion', headerName: 'descripcion' },
  {
    headerName: "Fecha",
    valueGetter: (row) => row.row.createdAt?.slice(0, 10),
  },
];
const getRowId = (row) => (row.id ? row.id : row._id);


export default function DataTable({data}) {
  let rows = data?.gastos ? data.gastos : data.movimientos

  console.log({data});
  return (
    <div style={{ height: '30vh', flex: 1, minWidth: '20vw', marginBottom: '4vh', padding: 10 }}>
      <DataGrid
        rows={rows ? rows : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={getRowId}
        pageSizeOptions={[5, 10]}
      />
      <div className='textContainer'>
      Total: {data.total}
      </div>
    </div>
  );
}