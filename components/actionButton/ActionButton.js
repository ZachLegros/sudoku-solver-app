import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, TouchableWithoutFeedback, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ActionButton(props) {
    const [shadow] = useState(new Animated.Value(5));
    const [color, setColor] = useState('#1788d4');

    function pressIn() {
        Animated.timing(
            shadow,
            {
                toValue: 3,
                duration: 50
            }
        ).start();
        setColor('#289ede');
    }

    function pressOut() {
        Animated.timing(
            shadow,
            {
                toValue: 5,
                duration: 50
            }
        ).start();
        setColor('#1788d4');
    }

  return (
    <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut} >
        <Animated.View style={[{elevation: shadow, backgroundColor: color}, styles.button]}>
            <Text style={{color: "#fff", fontSize: 16}}>{props.content}</Text>
            <FontAwesome5 name={props.iconName} style={{opacity: 0.9, marginLeft: 8}} size={14} color="#fff"/>
        </Animated.View>
    </TouchableWithoutFeedback>        
  );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 35,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 22,
        paddingRight: 22,
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
    },
});