import React from "react";
import HomeHOC from "./HOC/Home.hoc";
import temp from "./Components/temp";

function App() {
  return (
    
      <HomeHOC  path="/" exact component={temp} />   
   
   
  );
}

export default App;
