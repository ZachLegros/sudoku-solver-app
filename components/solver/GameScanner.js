import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Context from "../context/Context";
import Spinner from "../spinner/Spinner";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import Scope from "./Scope";
import { useFocusEffect } from "@react-navigation/native";

export default function GameScanner({ navigation }) {
  const context = useContext(Context);
  const [processing, setProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(0);
  const [loading, setLoading] = useState(false);

  const type = Camera.Constants.Type.back;

  // scope only
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const scopePadding = 25;

  const setScannerActive = context.scannerActive[1];

  let camera;

  const snap = async () => {
    if (!processing) {
      setProcessing(true);
      let photo = await camera.takePictureAsync();
      setLoading(true);

      // get origin and crop size
      const factor = photo.width / windowWidth;
      const cropSide = photo.width;
      // give padding to reduce margin of error
      const cropX = 0;
      const cropY = (photo.height - cropSide) / 2;

      // croping the picture
      ImageManipulator.manipulateAsync(
        photo.uri,
        [
          {
            crop: {
              originX: cropX,
              originY: cropY,
              width: cropSide,
              height: cropSide,
            },
          },
        ],
        { base64: true }
      ).then(async (croppedPhoto) => {
        // clean cache memory
        await FileSystem.deleteAsync(photo.uri).catch(() => {
          Alert.alert(
            "CamSolve",
            "Attempt to delete the uncropped image from CamSolve's cache memory failed.",
            [{ text: "OK" }],
            { cancelable: false }
          );
        });

        //detect sudoku board
        let detected = await context.detectSudoku(croppedPhoto);
        if (detected) {
          const solved = context.solveSudoku(detected);
          navigation.navigate("Result", { grid: solved });
        } else {
          setLoading(false);

          Alert.alert(
            "CamSolve",
            "No Sudoku puzzle was found. Make sure your that picture is bright enough and that the whole grid is covered in the frame.",
            [{ text: "OK" }],
            { cancelable: false }
          );
        }
        // clean cache memory
        await FileSystem.deleteAsync(croppedPhoto.uri).catch(() => {
          Alert.alert(
            "CamSolve",
            "Attempt to delete the image from CamSolve's cache memory failed.",
            [{ text: "OK" }],
            { cancelable: false }
          );
        });

        setProcessing(false);
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // focused
      const getStatus = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === "granted");
        if (status === "granted") {
          setScannerActive(true);
        }
      };
      getStatus();
      // not focused
      return () => {
        setLoading(false);
        setFlash(0);
        setScannerActive(false);
        setProcessing(false);
      };
    }, [])
  );

  if (hasPermission === null) {
    return <View style={{ backgroundColor: "#f5f6f7" }} />;
  }
  if (hasPermission === false) {
    setScannerActive(false);
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        {loading ? <Spinner /> : null}
        <Camera
          ref={(ref) => {
            camera = ref;
          }}
          style={{ flex: 1 }}
          ratio="16:9"
          flashMode={flash}
          autoFocus={true}
          type={type}
        >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                setScannerActive(false);
                navigation.pop();
              }}
              style={styles.elem}
            >
              <FontAwesome5 name="arrow-left" color="#fff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (camera) {
                  snap();
                }
              }}
              style={styles.elem}
            >
              <FontAwesome name="circle" color="#fff" size={65} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (flash === 0) {
                  setFlash(2);
                } else {
                  setFlash(0);
                }
              }}
              style={styles.elem}
            >
              <FontAwesome5 name="bolt" color="#fff" size={24} />
            </TouchableOpacity>
          </View>
          <Scope
            width={windowWidth}
            height={windowHeight}
            padding={scopePadding}
          />
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
    zIndex: 10,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#19191a",
  },
  elem: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 75,
  },
});
