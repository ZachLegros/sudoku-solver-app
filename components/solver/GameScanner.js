import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import ActionButton from "../actionButton/ActionButton";

export default function GameScanner(props) {
  return (
    <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => {}}>
            <Text>Scanner</Text>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
