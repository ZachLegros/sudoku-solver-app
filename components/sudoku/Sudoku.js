import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export default function Sudoku(props) {
  const solved = props.solved;
  const original = props.original;
  const parentWidth = props.width / 1.25;

  const isOriginal = (y, x, n) => {
    if (original) {
      return original[y][x] === n;
    }
    return false;
  };

  const gridSide = parentWidth;
  const cellSide = gridSide / 9;
  const gridBorder = 0.0035 * parentWidth;
  const cellBorder = 0.00125 * parentWidth;

  const styles = StyleSheet.create({
    text: {
      fontSize: 0.03 * parentWidth + 2,
    },
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
      borderWidth: gridBorder - gridBorder / 2,
      left: cellSide * 3 - cellBorder,
      zIndex: 10,
      position: "absolute",
    },
    vertRight: {
      height: gridSide,
      width: 0,
      borderColor: "gray",
      borderWidth: gridBorder - gridBorder / 2,
      left: cellSide * 6 - cellBorder,
      zIndex: 10,
      position: "absolute",
    },
    horizTop: {
      height: 0,
      width: gridSide,
      borderColor: "gray",
      borderWidth: gridBorder - gridBorder / 2,
      top: cellSide * 3 - cellBorder,
      zIndex: 10,
      position: "absolute",
    },
    horizBottom: {
      height: 0,
      width: gridSide,
      borderColor: "gray",
      borderWidth: gridBorder - gridBorder / 2,
      top: cellSide * 6 - cellBorder,
      zIndex: 10,
      position: "absolute",
    },
  });

  return (
    <View style={styles.grid}>
      <View style={styles.vertLeft} />
      <View style={styles.vertRight} />
      <View style={styles.horizTop} />
      <View style={styles.horizBottom} />
      {solved.map((row, y) => {
        return row.map((cell, x) => {
          return (
            <View key={x} style={styles.cell}>
              <Text
                style={[
                  !isOriginal(y, x, cell)
                    ? { color: "red", opacity: 0.6 }
                    : { color: "#3e4a4f" },
                  styles.text,
                ]}
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
