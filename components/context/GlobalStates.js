import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = props => {
  const [solverActive, setSolverActive] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);

  return (
    <Context.Provider
      value={{
        solverActive: [solverActive, setSolverActive],
        scannerActive: [scannerActive, setScannerActive]
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
