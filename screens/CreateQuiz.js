import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Slider,
  Button,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loading from "./Loading";
import QuizScreen from "./QuizScreen";
import { get_topics } from "../lib/external";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";

export default function CreateQuiz() {
  const [topic, setTopic] = useState("");
  const [num_questions, setNumber] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const navigation = useNavigation();

  const handlePressTakeQuiz = () => {
    navigation.navigate("QuizScreen", {
      topic: topic,
      numberQuestions: num_questions,
    });
  };

  const handleTextChange = (text) => {
    setTopic(text);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Quiz</Text>
      <Text style = {styles.topic}>Enter topic:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={handleTextChange}
        value={topic}
      />
      <Text style = {styles.questions}>Select number of questions:</Text>
      <Slider
        style={{ width: "80%", marginTop: 10 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={num_questions}
        onValueChange={handleNumberChange}
      />
      <Text style = {styles.difficulty}>Select difficulty:</Text>
      <Picker
        style={{ width: "80%" }}
        selectedValue={difficulty}
        onValueChange={handleDifficultyChange}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 36,
  },
  topic: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
  },
  questions: {
    marginTop: 40,
    marginBottom: 10,
  },
  difficulty: {
    marginTop: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 120,
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
