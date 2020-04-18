import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Context from "../context/Context";

export default function Result({ navigation, route }) {
  // 2d array of int representing the sudoku puzzle solved
  const grid = route.params.grid;

  useFocusEffect(
    React.useCallback(() => {
      console.log(Dimensions.get("screen"));
      console.log(Dimensions.get("window"));
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.vertLeft} />
        <View style={styles.vertRight} />
        <View style={styles.horizTop} />
        <View style={styles.horizBottom} />
        {grid.map((row) => {
          return row.map((cell, index) => {
            return (
              <View key={index} style={styles.cell}>
                <Text style={{ color: "#3e4a4f" }}>{cell}</Text>
              </View>
            );
          });
        })}
      </View>
    </View>
  );
}

const gridSide = Dimensions.get("window").width / 1.24;
const cellSide = gridSide / 9;
const gridBorder = 2;
const cellBorder = 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
