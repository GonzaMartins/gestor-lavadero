import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs'

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [data, setData] = useState({
    pedidos: null,
    pedidosHoy: null,
    sinEntregar: null,
    entregados: null,
    deben: null,
    precios: null,
    balance: null,
    ingresos: null,
    gastos: null
  });

  useEffect(() => {
    getPedidos();
    getPedidosHoy();
    getPedidosSinEntregar();
    getPrecios();
    getPedidosDebe();
    getPedidosEntregados();
    getBalance();
    getMovimientos()
  }, []);

  const getPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Pedidos");
      setData((prevState) => ({ ...prevState, pedidos: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getPedidosHoy = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Pedidos/hoy");

      setData((prevState) => ({ ...prevState, pedidosHoy: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getPedidosSinEntregar = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/Pedidos/sinEntregar"
      );

      setData((prevState) => ({ ...prevState, sinEntregar: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getPedidosEntregados = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/Pedidos/entregados"
      );

      setData((prevState) => ({ ...prevState, entregados: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getPedidosDebe = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Pedidos/debe");

      setData((prevState) => ({ ...prevState, deben: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getPrecios = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Precios");
      setData((prevState) => ({ ...prevState, precios: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getBalance = async () => {
    try {
      const response = await axios.get("http://localhost:3001/balance");
      setData((prevState) => ({ ...prevState, balance: response.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const getMovimientos = async () => {

    const desde = dayjs(dayjs().subtract(1, "month").startOf("month")).format('YYYY-MM-DD')
    const hasta = dayjs(dayjs().subtract(1, "month").endOf("month")).format('YYYY-MM-DD')

    try {
      const responseGastos = await axios.get(`http://localhost:3001/Movimientos/gastos/rango?desde=${desde}&hasta=${hasta}`);
      setData((prevState) => ({ ...prevState, gastos: responseGastos.data }));
      const responseIngresos = await axios.get(`http://localhost:3001/Movimientos/ingresos/rango?desde=${desde}&hasta=${hasta}`);
      setData((prevState) => ({ ...prevState, ingresos: responseIngresos.data }));
    } catch (error) {
      console.error(error);
    }
  };

  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};

export { MyContext, MyContextProvider };
