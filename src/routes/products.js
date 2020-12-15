import "../components/App/App.css";
import React, { Component } from "react";
import Catalog from "../components/Products/Catalog/Catalog";

class Produts extends Component {
  render() {
    return (
      <div className="App">
        <Catalog />
      </div>
    );
  }
}

export default Produts;
