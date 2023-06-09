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

export default function CreateQuiz({ route, navigation }) {
  const { topic, roomID, name } = route.params;
  const [num_questions, setNumber] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");

  const { user, setUser } = useContext(UserContext);

  const handlePressTakeQuiz = async () => {
    setUser((prev) => ({
      ...prev,
      recentTopics: [...new Set([...user.recentTopics, topic])],
    }));

    await BE.appendRecentTopics(topic);
    navigation.navigate("Quiz", {
      // topic: `[${difficulty} difficulty] ` + topic,
      topic: topic,
      numberQuestions: num_questions,
      gameID: roomID,
      user_name: name,
      joining: false,
    });
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  const handleNumberChange = (value) => {
    setNumber(value)
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <View style={styles.container}>

      <View style={[styles.topContainer, styles.shadow]}>
        <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10, color: "white" }}>
          Number of Questions
        </Text>
        <HorizontalNumberPicker values={numbers} onValueChange={handleNumberChange} />
      </View>

      <View style={[styles.difficultyButtons, styles.shadow]}>
        <View style={styles.difficultyButtonsRow}>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              { backgroundColor: difficulty === "easy" ? "#4051A6" : "#a0a8d3" },
            ]}
            onPress={() => handleDifficultyChange("easy")}
          >
            <Text style={styles.difficultyButtonText}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              { backgroundColor: difficulty === "medium" ? "#4051A6" : "#a0a8d3" },
            ]}
            onPress={() => handleDifficultyChange("medium")}
          >
            <Text style={styles.difficultyButtonText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.difficultyButton,
              { backgroundColor: difficulty === "hard" ? "#4051A6" : "#a0a8d3" },
            ]}
            onPress={() => handleDifficultyChange("hard")}
          >
            <Text style={styles.difficultyButtonText}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.outerCircle}>
        <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE5F88",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginHorizontal: 20,
  },
  difficultyButton: {
    borderRadius: 10,
    width: "32%",
    alignItems: "center",
  },
  difficultyButtonText: {
    fontSize: 18,
    color: "white",
    padding: 10,
    fontWeight: "bold",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  difficultyButtons: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#FFD44D",
    marginTop: 20,
  },
  difficultyButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    borderWidth: 8,
    borderColor: "#4051A6",
    width: 330,
    height: 330,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 25,
  },
  button: {
    backgroundColor: "#4051A6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    width: 300,
    height: 300,
    shadowColor: "#363636",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderWidth: 5,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  shaded: {
    opacity: 0.5,
    tintColor: 'gray',
  },
  buttonText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: '#3d3d3d',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
});
