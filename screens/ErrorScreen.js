import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import errorIcon from "../assets/errorIcon.png";

import { useNavigation } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";

export default function ErrorScreen() {
  const navigation = useNavigation();
  const handleHome = () => {
    navigation.navigate("Home")
  }
  const handleReport = () => {
    Alert.alert('Bug Report Sent', 'Thank you for your feedback!', [
      { text: 'Return to Home', onPress: () => console.log('OK Pressed') },
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sorry</Text>
      <View style={styles.imageRow}>
        <Image source={errorIcon} style={styles.image}></Image>
      </View>
      <Text style={styles.paragraph}>
        Our servers may be overloaded. Please try your request again in a little
        bit. If the error is still persisting, send a report by clicking the button below!
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonHome} onPress={handleHome}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReport}>
          <Text style={styles.buttonText}>Send Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    color: "#BCD5D4",
    fontWeight: 500,
  },
  button: {
    backgroundColor: "#BCD5D4",
    marginTop: "5%",
    marginBottom: "5%",
    alignItems: "center",
    justifyContent: "center",
    width: "35%",
    borderRadius: 8,
  },
  paragraph: {
    marginTop: "-10%",
    color: "#BCD5D4",
    fontWeight: 400,
    fontSize: 20
  },
  buttonHome: {
    backgroundColor: "#BCD5D4",
    marginTop: "5%",
    marginBottom: "5%",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "9%",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 15,
  },
  buttonRow: {
    marginTop: "7%",
    flexDirection: "row",
    height: "12.5%",
  },
  imageRow: {
    //marginTop: "-20%",
    height: "60%",
  },
  image: {
    flex: 1,
    aspectRatio: 1.0,
    resizeMode: "contain",
    width: "50%",
    height: "50%",

  },
  container: {
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingTop: "10%",
    flex: 1,
    height: "100%",
    backgroundColor: "#4051A6",
    alignItems: 'center',
  }
})
