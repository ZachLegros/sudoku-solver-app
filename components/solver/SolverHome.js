import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Context from "../context/Context";
import ActionButton from "../actionButton/ActionButton";
import Solver from './Solver';

export default function SolverHome(props) {
  const context = useContext(Context);
  const [solverActive, setSolverActive] = context.solverActive;
  
  if (solverActive === false) {
    return (
      <View style={styles.container}>
        <ActionButton onPress={() => {setSolverActive(true)}} content="Solve a Sudoku" iconName="puzzle-piece" />
      </View>
    );
  }

  return(
    <Solver />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
