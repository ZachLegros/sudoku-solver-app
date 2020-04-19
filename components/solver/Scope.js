import React, { useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

export default function Scope(props) {
  const width = props.width;
  const padding = props.padding;
  const height = props.height;
  const scopeSide = width - 2 * padding;
  const boundSide = 30;
  const borderWidth = 2;

  const styles = StyleSheet.create({
    scopeArea: {
      backgroundColor: "rgba(29, 29, 31, 0.8)",
      position: "absolute",
    },
    bound: {
      borderColor: "#fff",
      position: "absolute",
      width: boundSide,
      height: boundSide,
    },
    test: {
      left: padding,
      top: (height - scopeSide) / 2,
      borderColor: "#fff",
      position: "absolute",
      width: scopeSide,
      height: scopeSide,
      borderWidth: 2,
    },
    topLeft: {
      left: padding,
      top: (height - scopeSide) / 2,
      borderLeftWidth: borderWidth,
      borderTopWidth: borderWidth,
    },
    topRight: {
      right: padding,
      top: (height - scopeSide) / 2,
      borderRightWidth: borderWidth,
      borderTopWidth: borderWidth,
    },
    bottomLeft: {
      left: padding,
      bottom: (height - scopeSide) / 2,
      borderLeftWidth: borderWidth,
      borderBottomWidth: borderWidth,
    },
    bottomRight: {
      right: padding,
      bottom: (height - scopeSide) / 2,
      borderRightWidth: borderWidth,
      borderBottomWidth: borderWidth,
    },
    top: {
      width: Dimensions.get("window").width - 2 * padding,
      height: (height - scopeSide) / 2,
      left: padding,
      top: 0,
    },
    bottom: {
      width: Dimensions.get("window").width - 2 * padding,
      height: (height - scopeSide) / 2,
      left: padding,
      bottom: 0,
    },
    left: {
      width: padding,
      height: "100%",
      left: 0,
      top: 0,
    },
    right: {
      width: padding,
      height: "100%",
      right: 0,
      top: 0,
    },
  });

  return (
    <React.Fragment>
      {/* <View style={styles.test} /> */}
      <View style={[styles.bound, styles.topLeft]} />
      <View style={[styles.bound, styles.topRight]} />
      <View style={[styles.bound, styles.bottomLeft]} />
      <View style={[styles.bound, styles.bottomRight]} />
      <View style={[styles.scopeArea, styles.top]}></View>
      <View style={[styles.scopeArea, styles.bottom]}></View>
      <View style={[styles.scopeArea, styles.left]}></View>
      <View style={[styles.scopeArea, styles.right]}></View>
    </React.Fragment>
  );
}
