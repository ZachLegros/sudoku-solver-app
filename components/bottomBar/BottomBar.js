import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Solver from "../solver/Solver";
import SolvedPuzzles from "../solvedPuzzles/SolvedPuzzles";

export default function BottomBar(props) {
    const [bottomBarFade] = useState(new Animated.Value(-65));
    const [solverActive, setSolverActive] = useState(true);
    const [solvedActive, setSolvedActive] = useState(false);

    useEffect(() => {
        Animated.timing(
          bottomBarFade,
            {
              toValue: 0,
              duration: 250,
            }
          ).start();
    }, []);

  return (
    <Animated.View  style={[{bottom: bottomBarFade }, styles.bottomBar]}>
      <TouchableWithoutFeedback onPress={() => {
          setSolvedActive(false);
          setSolverActive(true);
          props.changeView(<Solver />);
        }}>
        <View style={styles.bottomTab}>
          <FontAwesome5 name="robot" size={22} style={{opacity: 0.8}} color={solverActive ? "#3e4a4f" : "#cdd0d1"} />
          <Text style={[styles.bottomTabText, solverActive ? styles.dark : null]}>Solver</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
          setSolvedActive(true);
          setSolverActive(false);
          props.changeView(<SolvedPuzzles />);
        }}>
        <View style={styles.bottomTab}>
          <FontAwesome5 name="th-large" size={22} style={{opacity: 0.8}} color={solvedActive ? "#3e4a4f" : "#cdd0d1"} />
          <Text style={[styles.bottomTabText, solvedActive ? styles.dark : null]}>Solved puzzles</Text>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flex: 1,
    position: 'absolute',
    height: 65,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    shadowColor: "#000",
    elevation: 4
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomTabText: {
    color: "#CCCECE",
    textAlign: "center",
    fontSize: 12,
    paddingTop: 2,
    fontWeight: "400",
  },
  dark: {
    color: "#3e4a4f"
  }
});