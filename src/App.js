import React from "react";
import Header from "./components/navbar/Navbar.component";
import "./App.scss";
import ROUTES, { RenderRoutes } from "./routes";


function App({classes}) {
  
  return (
    <div className="App">
      <Header />
      <div className="App-container">
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;
