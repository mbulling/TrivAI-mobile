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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loading from "./Loading";
import QuizScreen from "./QuizScreen";
import { get_topics } from "../lib/external";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import * as BE from "../lib/external";
import UserContext from "../contexts/user";

export default function CreateQuiz({ route, navigation }) {
  const { topic } = route.params;
  const [num_questions, setNumber] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");

  const { user, setUser } = useContext(UserContext);

  const handlePressTakeQuiz = async () => {
    setUser((prev) => ({
      ...prev,
      recentTopics: [...new Set([...user.recentTopics, topic])],
    }));

    await BE.appendRecentTopics(topic);
    navigation.navigate("QuizScreen", {
      topic: topic,
      numberQuestions: num_questions,
    });
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={{ fontSize: 15, fontWeight: "bold", padding: 10 }}>
          number of questions
        </Text>
        <View style={styles.topRow}>
          <Slider
            style={{ width: '60%', height: 50 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={num_questions}
            onValueChange={(value) => setNumber(value)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Text style={{ fontSize: 25, fontWeight: "bold", width: '20%', textAlign: 'center' }}>
            {num_questions}
          </Text>
        </View>
      </View>

      <View style={styles.difficultyButtons}>
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
  },
  difficultyButton: {
    borderRadius: 10,
    width: "32%",
    alignItems: "center",
  },
  difficultyButtonText: {
    fontSize: 20,
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
  buttonText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
});
