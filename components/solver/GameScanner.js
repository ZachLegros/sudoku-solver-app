import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from "expo-camera";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Context from "../context/Context";

export default function GameScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(0);
  const type = Camera.Constants.Type.back;
  const context = useContext(Context);
  const setScannerActive = context.scannerActive[1];
  let camera;

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

  const snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
    }
  };

  return (
    <View style={{flex: 1, width: "100%", height:"100%"}}>
      <Camera
      ref={ref => {camera = ref}}
      style={{ flex: 1 }} 
      ratio="16:9" 
      flashMode={flash} 
      autoFocus={true} 
      type={type}
      onCameraReady={() => {}}>
        <View
          style={styles.container}>
            <TouchableOpacity onPress={() => {
                setScannerActive(false);
              }
            } 
            style={styles.elem} >
              <FontAwesome5 name="arrow-left" color="#fff" size={24}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {if (camera) {snap();}}}
              style={styles.elem}>
              <FontAwesome name="circle" color="#fff" size={65}/>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                if (flash === 0) {
                  setFlash(2);
                } else {
                  setFlash(0);
                }
              }
            } 
            style={styles.elem} >
              <FontAwesome5 name="bolt" color="#fff" size={24}/>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "absolute",
    paddingBottom: 25,
    paddingTop: 25,
    bottom: 0,
    width: "100%",
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(50, 50, 51, 0.5)"
  },
  elem: {
    flex: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 75, 
    height: 75,
  }
});
