import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import BrandHeader from "../brandHeader/BrandHeader";
import Context from "../context/Context";
import Constants from "expo-constants";

export default function TopBar() {
  const context = useContext(Context);
  const scannerActive = context.scannerActive[0];

  if (scannerActive) {
    return null;
  }

  return (
    <View style={styles.topBar}>
      <BrandHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 12.5,
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 4,
  },
});
