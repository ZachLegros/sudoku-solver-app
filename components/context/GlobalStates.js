import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = (props) => {
  const [scannerActive, setScannerActive] = useState(false);

  // Seb to implement
  const detectSudoku = (photo) => {
    const detected = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    return detected;
  };

  const solveSudoku = (detected) => {};

  return (
    <Context.Provider
      value={{
        scannerActive: [scannerActive, setScannerActive],
        detectSudoku: detectSudoku,
        solveSudoku: solveSudoku,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
