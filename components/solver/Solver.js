import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from "../actionButton/ActionButton";
import GameScanner from "./GameScanner";

export default function Solver(props) {
    return (
    <View style={styles.container}>
        <Text>Solver</Text>
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
