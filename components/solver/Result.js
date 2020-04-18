import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ActionButton from "../actionButton/ActionButton";
import Sudoku from "../sudoku/Sudoku";
import Context from "../context/Context";

export default function Result({ navigation, route }) {
  const context = useContext(Context);
  // 2d array of int representing the sudoku puzzle solved
  const solvedGrid = route.params.grid;
  const originalGrid = route.params.originalGrid;

  useFocusEffect(
    React.useCallback(() => {
      //console.log(Dimensions.get("window"));
    }, [])
  );

  return (
    <View style={styles.container}>
      <ActionButton
        onPress={() => {
          const grids = {
            original: originalGrid,
            solved: solvedGrid,
          };
          context.saveSudoku(grids);
        }}
        content="Save"
        iconName={null}
      />
      <Sudoku grid={solvedGrid} originalGrid={originalGrid} />
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
