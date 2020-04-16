import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

export default function Scope(props) {
  const width = props.width;
  const padding = props.padding;
  const height = props.height;
  const scopeSide = width - 2 * padding;

  const styles = StyleSheet.create({
    scopeArea: {
      backgroundColor: "rgba(50, 50, 51, 0.9)",
      position: "absolute",
    },
    top: {
      width: "100%",
      height: (height - scopeSide) / 2,
      top: 0,
    },
    bottom: {
      width: "100%",
      height: (height - scopeSide) / 2,
      bottom: 0,
    },
    left: {
      width: padding,
      height: scopeSide,
      left: 0,
      top: (height - scopeSide) / 2,
    },
    right: {
      width: padding,
      height: scopeSide,
      right: 0,
      top: (height - scopeSide) / 2,
    },
  });

  return (
    <React.Fragment>
      <View style={[styles.scopeArea, styles.top]}></View>
      <View style={[styles.scopeArea, styles.bottom]}></View>
      <View style={[styles.scopeArea, styles.left]}></View>
      <View style={[styles.scopeArea, styles.right]}></View>
    </React.Fragment>
  );
}
