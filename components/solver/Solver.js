import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from "../actionButton/ActionButton";

export default function Solver() {
  return (
    <View style={styles.container}>
      <ActionButton content="Solve Sudoku" iconName="puzzle-piece" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
