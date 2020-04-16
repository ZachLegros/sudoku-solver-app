import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function Spinner(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={70} color="#1788d4"/>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 999,
    height: '100%',
    backgroundColor: "rgba(237, 237, 237, 0.75)"
  },
});
