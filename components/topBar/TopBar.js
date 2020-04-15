import React, { useState, useEffect, useContext } from 'react';
import { Image, Animated, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons';
import BrandHeader from "../brandHeader/BrandHeader";
//import { LinearGradient } from "expo-linear-gradient"
import Context from "../context/Context";

export default function TopBar() {
  const context = useContext(Context);
  const scannerActive = context.scannerActive[0];
  
  useEffect(() => {
  }, []);

  if (scannerActive) {
    return null;
  }

  return (
    <View style={styles.topBar}>
      <BrandHeader />
    </View>
  );
}

const styles = StyleSheet.create({
    topBar: {
        position: "absolute",
        top: 0,
        height: 90,
        padding: 25,
        paddingBottom: 12.5,
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        flexDirection: "row",
        backgroundColor: "#fff",
        elevation: 4 
    }
});