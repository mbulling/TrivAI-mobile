import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Slider,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loading from "./Loading";
import QuizScreen from "./QuizScreen";
import { get_topics } from "../lib/external";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import HorizontalPicker from './HorizontalPicker';

export default function EnterTopic() {
  const [topic, setTopic] = useState("");
  const navigation = useNavigation();

  const handlePressTakeQuiz = () => {
    navigation.navigate("Create", {
      topic: topic,
    });
  };

  const handleTextChange = (text) => {
    setTopic(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.topic}>Enter Topic:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handleTextChange}
          value={topic}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
    margin: 45,
    marginBottom: 25,
  },
  topic: {
    marginTop: 80,
    marginBottom: 10,
    fontSize: 25,
    color: '#363636',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4051A6',
    justifyContent: 'center',
    width: '80%',
    bottom: 0,
    alignItems: 'center',
    shadowColor: '#363636',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
    borderRadius: 10,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textInput: {
    width: '80%',
    height: 50,
    borderColor: '#7a42f4',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 24,
    marginTop: 10,
  },
});
