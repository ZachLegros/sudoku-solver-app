import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomBar from './components/bottomBar/BottomBar';
import TopBar from './components/topBar/TopBar';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />
      <Text>Open up App.js to start working on your app!</Text>
      <BottomBar />
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
