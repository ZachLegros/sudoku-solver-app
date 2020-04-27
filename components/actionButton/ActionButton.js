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
      style={[
        styles.button,
        {
          paddingTop: props.content ? 12 : 8,
          paddingBottom: props.content ? 12 : 8,
          paddingLeft: props.content ? 22 : 8,
          paddingRight: props.content ? 22 : 8,
        },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 14 }}>{props.content}</Text>
      {props.iconName ? (
        <FontAwesome5
          name={props.iconName}
          style={[{ opacity: 0.9 }, props.content ? { marginLeft: 8 } : null]}
          size={props.content ? 14 : 18}
          color="#fff"
        />
      ) : null}
    </Ripple>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 0,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1788d4",
  },
});
