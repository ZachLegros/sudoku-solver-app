import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from "expo-camera";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Context from "../context/Context";
import Spinner from '../spinner/Spinner';

export default function GameScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(0);
  const [loading, setLoading] = useState(false);

  const type = Camera.Constants.Type.back;

  const context = useContext(Context);
  const setScannerActive = context.scannerActive[1];
  
  let camera;


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status === 'granted') {setScannerActive(true);}

      return(() => {
        setLoading(false);
        setFlash(false);
        setHasPermission(null);
      }
      );
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
      let photo = await camera.takePictureAsync({ base64: true });
      setLoading(true);
      const detected = await context.detectSudoku(photo);
      if (detected) {
        setLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <View style={{flex: 1, width: "100%", height:"100%"}}>
        {loading ? <Spinner /> : null}
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
                onPress={() => {if (camera) {
                    snap();
                  }
                }}
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
    </React.Fragment>
    
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
