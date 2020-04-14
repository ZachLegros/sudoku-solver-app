import React, { useState, useEffect } from 'react';
import { Image, Animated, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons';
import BrandHeader from "../brandHeader/BrandHeader";
//import { LinearGradient } from "expo-linear-gradient"

export default function TopBar() {

    useEffect(() => {
    }, []);

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
        height: 100,
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