import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameScanner from "./GameScanner";
import ActionButton from "../actionButton/ActionButton";
import Context from "../context/Context";

export default function Solver(props) {
  const context = useContext(Context);
  const [scannerActive, setScannerActive] = context.scannerActive;

  useEffect(() => {
  }, []);

  if (scannerActive) {
    return (
      <GameScanner />
    );
  }

  return (
    <View style={styles.container}>
      <ActionButton onPress={() => {setScannerActive(true)}} content="Solve a Sudoku" iconName="puzzle-piece" />
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
