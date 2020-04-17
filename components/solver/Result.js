import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Result({ navigation, route }) {
  // 2d array of int representing the sudoku puzzle solved
  const grid = route.params.grid;

  return (
    <View style={styles.container}>
      <Text>grid here</Text>
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
