import logo from "../../logo.svg";
import "./App.css";
import axios from "axios";
import Sample from "../sales/sample";

function App() {
  axios.get("/api/products", {}).then((response) => console.log(response));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World!
        </a>
        <Sample/>
      </header>
    </div>
  );
}

export default App;
