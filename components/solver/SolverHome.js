import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from "../actionButton/ActionButton";
import Context from "../context/Context";

export default function SolverHome({navigation}) {
  const context = useContext(Context);
  const setScannerActive = context.scannerActive[1];

  return (
    <View style={styles.container}>
      <ActionButton onPress={() => {
        setScannerActive(true);
        navigation.push('GameScanner');
        }} content="Solve a Sudoku" iconName="puzzle-piece" />
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
