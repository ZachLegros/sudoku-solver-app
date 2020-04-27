import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavigation from "../../RootNavigation";

export default function BackButton(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.pop();
      }}
      style={[
        styles.button,
        props.display !== undefined || props.display !== null
          ? { display: props.display }
          : null,
      ]}
    >
      <FontAwesome5
        style={styles.arrow}
        name="arrow-left"
        size={22}
        color="#3e4a4f"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
