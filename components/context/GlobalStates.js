import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = props => {
  const [scannerActive, setScannerActive] = useState(false);

  const detectSudoku = photo => {
    const detected = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    return detected;
  }

  return (
    <Context.Provider
      value={{
        scannerActive: [scannerActive, setScannerActive],
        detectSudoku: detectSudoku
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
