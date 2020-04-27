import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BrandHeader(props) {
  return (
    <View
      style={[
        styles.brandContainer,
        props.display !== undefined || props.display !== null
          ? { display: props.display }
          : null,
      ]}
    >
      <Image style={styles.logo} source={require("./logo.png")} />
      <Text style={styles.brandText}>CamSolve</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  logo: {
    height: 40,
    width: 40,
  },
  brandText: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 8,
    color: "#3e4a4f",
    width: "100%",
  },
});
