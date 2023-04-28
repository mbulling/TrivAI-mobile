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

export default function CreateQuiz({ route, navigation }) {
  const { topic } = route.params;
  const [num_questions, setNumber] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");

  const handlePressTakeQuiz = () => {
    navigation.navigate("QuizScreen", {
      topic: topic,
      numberQuestions: num_questions,
    });
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const difficulties = ['easy', 'medium', 'hard']

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.pickerWrapper2}>
          <View style={styles.questionPicker}>
            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>number of questions</Text>
            <HorizontalPicker values={numbers} width={200} itemWidth={200} onValueChange={handleNumberChange} />
          </View>
        </View>
      </View>
      <View style={styles.outerCircle}>
        <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topRow}>
        <View style={styles.pickerWrapper1}>
          <View style={styles.difficultyBox}>
            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>choose difficulty</Text>
            <HorizontalPicker values={difficulties} width={150} itemWidth={200} onValueChange={handleDifficultyChange} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    borderRadius: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
  },
  pickerWrapper1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    maxHeight: 120,
  },
  pickerWrapper2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    maxHeight: 120,
  },
  difficultyBox: {
    alignItems: 'center',
    backgroundColor: '#fac8f9',
    borderRadius: 10,
  },
  questionPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83d4fc',
    borderRadius: 10,
  },
  topic: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderWidth: 8,
    borderColor: '#29578a',
    width: 330,
    height: 330,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  button: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    width: 300,
    height: 300,
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
