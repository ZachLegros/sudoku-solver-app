import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import ActionButton from "../actionButton/ActionButton";
import Sudoku from "../sudoku/Sudoku";
import Context from "../context/Context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Result({ navigation, route }) {
  const context = useContext(Context);
  // 2d array of int representing the sudoku puzzle solved
  const solved = route.params.solved;
  const original = route.params.original;

  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.container}>
      {!saved ? (
        <View
          style={{ marginBottom: 12.5, marginLeft: "auto", marginRight: 25 }}
        >
          <TouchableOpacity
            onPress={() => {
              const grids = {
                original: original,
                solved: solved,
              };
              context.saveSudoku(grids);
              setSaved(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 8, fontSize: 16, color: "#3e4a4f" }}>
                Save
              </Text>
              <FontAwesome5 name={"save"} size={14} color="#3e4a4f" />
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Sudoku
        solved={solved}
        original={original}
        width={Dimensions.get("window").width - 50}
      />
      <View
        style={{
          marginTop: 25,
        }}
      >
        <ActionButton
          onPress={() => {
            navigation.push("GameScanner");
          }}
          content="Solve a Sudoku"
          iconName="puzzle-piece"
        />
      </View>
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
