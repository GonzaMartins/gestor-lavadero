import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableHome from "./tables/TableHome";
import TableParaEntregar from "./tables/TableParaEntregar";
import TableEntregados from "./tables/TableEntregados";
import TableDebe from "./tables/TableDebe";
import Nav from "../components/Nav";
import { MyContext } from "../context/StateDataContext"
import { Button } from "@mui/material";
import ModalCrearPedido from './ModalCrearPedido'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);
  const tabRef = useRef(null);

  useEffect(() => {
    // Enfocar el primer tab después del montaje del componente
    if (tabRef.current) {
      tabRef.current.focus();
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const general = useContext(MyContext);
  return (
    <div>
      <Nav />
      <Box sx={{ width: "100%" }} style={{maxWidth: '90vw'}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="tab"
            defaultIndex={0}
            ref={tabRef}
            // Establecer los estilos personalizados para el enfoque
            sx={{
              "& .Mui-selected": {
                color: "#ffffff",
              },
              "& .MuiTab-root": {
                color: "#ffffff",
              },
            }}
          >
            <Tab className="tab" label="General" {...a11yProps(0)} />
            <Tab className="tab" label="Para entregar" {...a11yProps(1)} />
            <Tab className="tab" label="Entregados" {...a11yProps(2)} />
            <Tab className="tab" label="Debe" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <ModalCrearPedido />
        <TabPanel value={value} index={0}>
          <TableHome data={general}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableParaEntregar data={general}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableEntregados data={general}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TableDebe data={general} />
        </TabPanel>
      </Box>
    </div>
  );
}
