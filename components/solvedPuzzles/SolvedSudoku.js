import React, { useContext } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Sudoku from "../sudoku/Sudoku";
import Context from "../context/Context";

export default function SolvedSudoku({ route }) {
  const context = useContext(Context);

  // 2d array of int representing the sudoku puzzle solved
  const solved = route.params.solved;
  const original = route.params.original;
  const title = route.params.title;

  useFocusEffect(
    React.useCallback(() => {
      context.solvedFocused[1](true);

      return () => {
        context.solvedFocused[1](false);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 12.5, color: "#3e4a4f" }}>
        {title}
      </Text>
      <Sudoku
        solved={solved}
        original={original}
        width={Dimensions.get("window").width - 50}
      />
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
