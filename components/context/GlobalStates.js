import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = (props) => {
  const [scannerActive, setScannerActive] = useState(false);

  // Seb to implement
  const detectSudoku = (photo) => {
    const detected = new Promise((resolve) => {
      const grid = [
        [7, 0, 8, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 2, 0, 1, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 0, 2, 6],
        [3, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 9, 0],
        [0, 9, 0, 6, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 7, 0, 5, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      resolve(grid);
    });
    return detected;
  };

  // returns a 2d array representing the solved Sudoku puzzle
  // parameter is the detected 2d array from detectSudoku
  const solveSudoku = (detected) => {
    let grid = detected;

    // helper function to check if a move is possible
    const isPossible = (grid, x, y, n) => {
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

    let solvedPuzzle = [];
    // recursive function to solve the Sudoku puzzle
    function solve(grid) {
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (grid[y][x] === 0) {
            for (let n = 1; n < 10; n++) {
              if (isPossible(grid, x, y, n)) {
                grid[y][x] = n;
                solve(grid);
                grid[y][x] = 0;
              }
            }
            return;
          }
        }
      }
      for (let y = 0; y < 9; y++) {
        solvedPuzzle.push([]);
        for (let x = 0; x < 9; x++) {
          solvedPuzzle[y].push(grid[y][x]);
        }
      }
    }

    solve(grid);
    return solvedPuzzle;
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
