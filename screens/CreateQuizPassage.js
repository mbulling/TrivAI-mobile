import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import HorizontalNumberPicker from "./HorizontalPicker";

export default function CreateQuiz({ route, navigation }) {
  const { passage } = route.params;
  const [num_questions, setNumber] = useState(3);
  console.log(passage);
  const handlePressTakeQuiz = async () => {
    navigation.navigate("Quiz From Passage", {
      passage: passage,
      numberQuestions: num_questions,
      gameID: 0,
      user_name: "mason",
      joining: false,
    });
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
