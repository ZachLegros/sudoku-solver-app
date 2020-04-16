import React, { useState, useEffect, useContext } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ripple from "react-native-material-ripple";
import Context from "../context/Context";
import * as RootNavigation from '../../RootNavigation';

export default function BottomBar() {
    const [bottomBarFade] = useState(new Animated.Value(-65));
    const [solverActive, setSolverActive] = useState(true);
    const [solvedActive, setSolvedActive] = useState(false);
    const context = useContext(Context);
    const scannerActive = context.scannerActive[0];

    useEffect(() => {
        Animated.timing(
          bottomBarFade,
            {
              toValue: 0,
              duration: 400,
            }
          ).start();
    }, []);

  if (scannerActive) {
    return null;
  }

  return (
    <Animated.View  style={[{bottom: bottomBarFade }, styles.bottomBar]}>
      <Ripple style={styles.bottomTab} rippleFades={true} rippleColor="#cccaca" rippleOpacity={0.25} rippleSize={500} onPress={() => {
          setSolvedActive(false);
          setSolverActive(true);
          RootNavigation.navigate('SolverHome');
        }}>
          <FontAwesome5 name="robot" size={22} style={{opacity: 0.8}} color={solverActive ? "#3e4a4f" : "#cdd0d1"} />
          <Text style={[styles.bottomTabText, solverActive ? styles.dark : null]}>Solver</Text>
      </Ripple>
      <Ripple style={styles.bottomTab} rippleFades={true} rippleColor="#cccaca" rippleOpacity={0.25} rippleSize={500} onPress={() => {
          setSolvedActive(true);
          setSolverActive(false);
          RootNavigation.navigate('SolvedPuzzlesHome');
        }}>
          <FontAwesome5 name="th-large" size={22} style={{opacity: 0.8}} color={solvedActive ? "#3e4a4f" : "#cdd0d1"} />
          <Text style={[styles.bottomTabText, solvedActive ? styles.dark : null]}>Solved puzzles</Text>
      </Ripple>
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
    height: "100%",
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