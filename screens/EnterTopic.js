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
    navigation.navigate("CreateQuiz", {
      topic: topic,
    });
  };

  const handleTextChange = (text) => {
    setTopic(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.topic}>Enter topic:</Text>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    borderRadius: 10,
  },
  topic: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: '80%',
    bottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 5,
    borderColor: '#29578a',
    borderStyle: 'solid',

  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: '#7a42f4',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
});
