import React from "react";
import { StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";

export default function ActionButton(props) {
  return (
    <Ripple
      onPress={props.onPress}
      rippleColor="#084670"
      rippleFades={true}
      rippleOpacity={0.25}
      rippleSize={400}
      rippleContainerBorderRadius={5}
      style={styles.button}
    >
      <Text style={{ color: "#fff", fontSize: 14 }}>{props.content}</Text>
      {props.iconName ? (
        <FontAwesome5
          name={props.iconName}
          style={{ opacity: 0.9, marginLeft: 8 }}
          size={14}
          color="#fff"
        />
      ) : null}
    </Ripple>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 22,
    paddingRight: 22,
    flex: 0,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1788d4",
  },
});
