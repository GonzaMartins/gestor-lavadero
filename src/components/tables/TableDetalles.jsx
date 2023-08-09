import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../styles/tableDetalles.css";
export default function BasicTable({ pedidos, debe }) {
  const calcularTotal = () => {
    let total = 0;
    pedidos.forEach((element) => {
      total += element.precio;
    });
    return total;
  };
  
  console.log(pedidos[0], debe);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Servicio</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos &&
            pedidos.map((row) => {return <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                {row.servicio}
                </TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{row.precio}</TableCell>
              </TableRow>
            })}
          <div className="totalText">Total: {calcularTotal()}</div>
          {debe.debe ? (
            <div className="totalText">Debe: {debe.monto}</div>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
