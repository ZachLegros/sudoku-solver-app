import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameScanner from "./GameScanner";
import Context from "../context/Context";

export default function Solver(props) {
  const context = useContext(Context);
  const [scannerActive, setScannerActive] = context.scannerActive;

  useEffect(() => {
    setScannerActive(true);
  }, []);

  if (scannerActive) {
    return (
      <GameScanner />
    );
  }
  return (
    <Text>Solver</Text>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
