import React, { useState } from "react";
import Header from "./Dashboard/Headeer/Header";
import Home from "./Dashboard/Home/Home";
interface PropTypes {}

const App: React.FC<PropTypes> = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
