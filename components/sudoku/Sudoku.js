import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export default function Sudoku(props) {
  const grid = props.grid;
  const originalGrid = props.originalGrid;

  const isOriginal = (y, x, n) => {
    if (originalGrid) {
      return originalGrid[y][x] === n;
    }
    return false;
  };

  return (
    <View style={styles.grid}>
      <View style={styles.vertLeft} />
      <View style={styles.vertRight} />
      <View style={styles.horizTop} />
      <View style={styles.horizBottom} />
      {grid.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <View key={x} style={styles.cell}>
              <Text
                style={
                  !isOriginal(y, x, cell)
                    ? { color: "red", opacity: 0.6 }
                    : { color: "#3e4a4f" }
                }
              >
                {cell}
              </Text>
            </View>
          );
        });
      })}
    </View>
  );
}

const gridSide = Dimensions.get("window").width / 1.24;
const cellSide = gridSide / 9;
const gridBorder = 2;
const cellBorder = 0.5;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: gridSide + 2 * gridBorder,
    height: gridSide + 2 * gridBorder,
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: gridBorder,
  },
  cell: {
    width: cellSide,
    height: cellSide,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgb(190, 193, 196)",
    borderWidth: cellBorder,
  },
  vertLeft: {
    height: gridSide,
    width: 0,
    borderColor: "gray",
    borderWidth: 1,
    left: cellSide * 3 - cellBorder,
    zIndex: 10,
    position: "absolute",
  },
  vertRight: {
    height: gridSide,
    width: 0,
    borderColor: "gray",
    borderWidth: 1,
    left: cellSide * 6 - cellBorder,
    zIndex: 10,
    position: "absolute",
  },
  horizTop: {
    height: 0,
    width: gridSide,
    borderColor: "gray",
    borderWidth: 1,
    top: cellSide * 3 - cellBorder,
    zIndex: 10,
    position: "absolute",
  },
  horizBottom: {
    height: 0,
    width: gridSide,
    borderColor: "gray",
    borderWidth: 1,
    top: cellSide * 6 - cellBorder,
    zIndex: 10,
    position: "absolute",
  },
});
