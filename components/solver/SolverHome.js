import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Context from "../context/Context";
import ActionButton from "../actionButton/ActionButton";
import Solver from './Solver';

export default function SolverHome(props) {
    const context = useContext(Context);
    const [solverActive, setSolverActive] = context.solverActive;
    
  return (
    <View style={styles.container}>
        {!solverActive ? (
          <View>
            <ActionButton onPress={() => {setSolverActive(true)}} content="Solve a Sudoku" iconName="puzzle-piece" />
          </View>
        ) : <Solver />
        }
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
