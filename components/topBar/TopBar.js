import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import BrandHeader from "../brandHeader/BrandHeader";
import Context from "../context/Context";
import Constants from "expo-constants";
import Ripple from "react-native-material-ripple";
import BackButton from "../backButton/BackButton";

export default function TopBar({}) {
  const context = useContext(Context);
  const scannerActive = context.scannerActive[0];
  const solvedFocused = context.solvedFocused[0];

  if (scannerActive) {
    return null;
  }

  return (
    <View style={styles.topBar}>
      <BackButton display={solvedFocused ? "flex" : "none"} />
      <BrandHeader display={solvedFocused ? "none" : "flex"} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    paddingTop: Constants.statusBarHeight + 12.5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 12.5,
    width: "100%",
    zIndex: 50,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
