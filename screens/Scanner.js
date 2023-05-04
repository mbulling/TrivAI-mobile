import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Slider,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loading from "./Loading";
import QuizScreen from "./QuizScreen";
import { get_topics } from "../lib/external";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import * as BE from "../lib/external";
import UserContext from "../contexts/user";
import HorizontalNumberPicker from "./HorizontalPicker";
import CreateQuizPassage from "./CreateQuizPassage"
export default function Scanner() {
  const navigation = useNavigation();

  const handlePressNext = () => {
    navigation.navigate("Create Quiz From Passage", { passage: "Algorithm homework" })
  }
  return (
    <View>
      <TouchableOpacity
        onPress={handlePressNext}
      ><Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
}