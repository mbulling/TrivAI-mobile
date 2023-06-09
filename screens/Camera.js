import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation } from "@react-navigation/native";
import ocrkey from "../lib/ocrapikey"

export default function CameraScreen() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [uriLink, setUriLink] = React.useState("")
  const navigation = useNavigation();

  const compressPhoto = async (photoUri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      photoUri,
      [],
      { base64: true, compress: 0.1, format: ImageManipulator.SaveFormat.JPEG },
    );
    let compressed = manipResult.base64
    return compressed
  }

  const processImage = async (link) => {
    try {
      let filepath = await compressPhoto(link)
      var myHeaders = new Headers();
      myHeaders.append("apikey", ocrkey);

      var formdata = new FormData();
      formdata.append("language", "eng");
      formdata.append("base64image", 'data:image/jpg;base64,' + filepath);
      formdata.append("filetype", "jpg")

      let response = await fetch("https://api.ocr.space/parse/image", {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      })

      let json = await response.json();
      let result = json["ParsedResults"][0]["ParsedText"]
      return result
    }
    catch (error) {
      navigation.navigate("Error");
      console.log(error)
    }
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
      navigation.navigate("Home")
    }
  }

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
    let link = photo.uri
    setUriLink(link);
  }


  const __savePhoto = async () => {
    try {
      const passage = await processImage(uriLink)
      if (passage === "") {
        throw new Error("Issue with parsing text")
      }
      navigation.navigate("Create Quiz From Passage", { passage: passage })
    } catch (err) {
      console.log(err)
      navigation.navigate("Error")
    }
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#4051A6',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4051A6",
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 20,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                backgroundColor: "#4051A6",
                width: 140,
                height: 40,
                alignItems: 'center',
                borderRadius: 5,
                justifyContent: 'center',

              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Retake Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                backgroundColor: "#4051A6",
                width: 140,
                height: 40,
                alignItems: 'center',
                borderRadius: 5,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Process Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}