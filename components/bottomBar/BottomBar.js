import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function BottomBar() {
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
        }}>
        <View style={styles.bottomTab}>
          <FontAwesome5 name="robot" size={22} color={solverActive ? "#0167E7" : "#CCCECE"} />
          <Text style={[styles.bottomTabText, solverActive ? styles.blue : null]}>Solver</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
          setSolvedActive(true);
          setSolverActive(false);
        }}>
        <View style={styles.bottomTab}>
          <FontAwesome5 name="th-large" size={22} color={solvedActive ? "#0167E7" : "#CCCECE"} />
          <Text style={[styles.bottomTabText, solvedActive ? styles.blue : null]}>Solved puzzles</Text>
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
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.8,
    elevation: 12
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomTabText: {
    color: "#CCCECE",
    textAlign: "center",
    fontSize: 11,
    paddingTop: 2,
    fontWeight: "400",
  },
  blue: {
    color: "#0167E7"
  }
});