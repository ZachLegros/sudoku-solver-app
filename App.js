import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomBar from './components/bottomBar/BottomBar';
import TopBar from './components/topBar/TopBar';
import GlobalStates from "./components/context/GlobalStates";
import Router from "./Router";

export default function App() {
  return (
    <GlobalStates>
      <React.Fragment>
        <TopBar />
          <Router />
        <BottomBar />
      </React.Fragment>
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
