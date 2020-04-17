import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Test({ navigation, route }) {
  const uri = route.params.uri;

  return (
    <View style={styles.container}>
      <Image
        style={{ resizeMode: "contain", width: "100%", height: 250 }}
        source={{ uri: uri }}
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
