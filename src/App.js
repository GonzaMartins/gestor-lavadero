import logo from "./logo.svg";
import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home";
import { MyContextProvider } from './context/StateDataContext';
function App() {
  return (
    <MyContextProvider>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </MyContextProvider>
  );
}

export default App;
