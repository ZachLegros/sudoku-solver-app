import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomBar from './components/bottomBar/BottomBar';
import TopBar from './components/topBar/TopBar';
import Solver from "./components/solver/Solver";
import GlobalStates from "./components/context/GlobalStates";

export default function App() {
  // setting the default view to Solver component
  const [activeView, setActiveView] = useState(<Solver />);

  return (
    <GlobalStates>
      <View style={styles.container}>
        <TopBar />
        {activeView}
        <BottomBar changeView={(component) => {setActiveView(component)}}/>
      </View> 
    </GlobalStates> 
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
