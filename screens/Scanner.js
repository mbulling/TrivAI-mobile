import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";


export default function Scanner() {
  const navigation = useNavigation();

  const handlePressNext = () => {
    navigation.navigate("Create Quiz From Passage", { passage: "Algorithm homework" })
  }
  const handlePressCamera = () => {
    navigation.navigate("Camera")
  }
  return (
    <View>
      <TouchableOpacity
        onPress={processImage}
      ><Text>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePressCamera}
      ><Text>Camera</Text>
      </TouchableOpacity>
    </View>
  )
}