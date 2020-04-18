import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Sudoku from "../sudoku/Sudoku";

export default function Result({ navigation, route }) {
  // 2d array of int representing the sudoku puzzle solved
  const grid = route.params.grid;
  const originalGrid = route.params.originalGrid;

  useFocusEffect(
    React.useCallback(() => {
      console.log(Dimensions.get("window"));
    }, [])
  );

  return (
    <View style={styles.container}>
      <Sudoku grid={grid} originalGrid={originalGrid} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
