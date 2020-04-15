import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import { FontAwesome5 } from '@expo/vector-icons';
import Context from "../context/Context";

export default function GameScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(0);
  const type = Camera.Constants.Type.back;
  const context = useContext(Context);
  const setScannerActive = context.scannerActive[1];

  useEffect(() => {
    setScannerActive(true);
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return ( () => setScannerActive(false));
  }, [])

  if (hasPermission === null) {
    return <View style={{backgroundColor: "#f5f6f7"}}/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex: 1, width: "100%", height:"100%", position: "absolute", top: 0}}>
      <Camera style={{ flex: 1 }} ratio="16:9" flashMode={flash} autoFocus={true} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center"
          }}>
            <TouchableOpacity onPress={() => {
                if (flash === 0) {
                  setFlash(2);
                } else {
                  setFlash(0);
                }
              }
            } 
            style={styles.flash} >
              <FontAwesome5 name="bolt" color="#fff" size={24}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                setScannerActive(false);
              }
            } 
            style={styles.exit} >
              <FontAwesome5 name="arrow-left" color="#fff" size={24}/>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  flash: {
    flex: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 75, 
    height: 75,
    position: "absolute",
    top: 30,
    right: 0
  },
  exit: {
    flex: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 75, 
    height: 75,
    position: "absolute",
    top: 30,
    left: 0
  }
});
