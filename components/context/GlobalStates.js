import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = props => {
  const [scannerActive, setScannerActive] = useState(false);

  return (
    <Context.Provider
      value={{
        scannerActive: [scannerActive, setScannerActive]
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
