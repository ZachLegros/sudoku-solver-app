import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from "../actionButton/ActionButton";

export default function SolvedPuzzles() {
  return (
    <View style={styles.container}>
      <Text>This is the solved puzzles page.</Text>
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
