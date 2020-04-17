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

  // returns a 2d array representing the solved Sudoku puzzle
  // parameter is the detected 2d array from detectSudoku
  const solveSudoku = (detected) => {
    let grid = detected;
    // helper function to check if a move is possible
    const isPossible = (x, y, n) => {
      if (grid[y][x] != 0) {
        return false;
      }
      for (let i = 0; i < 9; i++) {
        if (grid[y][i] === n) {
          return false;
        }
      }
      for (let j = 0; j < 9; j++) {
        if (grid[j][x] === n) {
          return false;
        }
      }
      // to change
      const flooredX = Math.floor(x / 3) * 3;
      const flooredY = Math.floor(y / 3) * 3;
      for (let x = flooredX; x < flooredX + 3; x++) {
        for (let y = flooredY; y < flooredY + 3; y++) {
          if (grid[y][x] === n) {
            return false;
          }
        }
      }
      return true;
    };
  };

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
