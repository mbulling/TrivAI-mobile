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
// import HorizontalPicker from "./HorizontalPicker";
import * as BE from "../lib/external";
import UserContext from "../contexts/user";
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';

export default function CreateQuiz({ route, navigation }) {
  const { topic } = route.params;
  const [num_questions, setNumber] = useState(3);
  const [difficulty, setDifficulty] = useState("medium");
  //const navigation = useNavigation();
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

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const difficulties = ["easy", "medium", "hard"];


  const questionItem = (item, index) => (
    <View style={styles.pickerWrapper2}>
      <View style={styles.questionPicker}>
        <Text style = {styles.wtf}>
          {item}
        </Text>
      </View>
    </View>
  );

  const difficultyItem = (item, index) => (
    <View style={styles.pickerWrapper2}>
      <View style={styles.difficultyPicker}>
        <Text style = {styles.wtf}>
          {item}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.pickerWrapper2}>
           <View style={styles.questionPicker}>
            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>
              number of questions
            </Text>
            <HorizontalPicker
              data={numbers}
              renderItem={questionItem}
              itemWidth={10}
              onChange = {handleNumberChange}
              defaultIndex = {9}
              animatedScrollToDefaultIndex = {true}
            />
          </View>
        </View>
      </View>
      <View style={styles.topRow}>
        <View style={styles.pickerWrapper1}>
          <View style={styles.difficultyBox}>
            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 500 }}>
              choose difficulty
            </Text>
            <HorizontalPicker
              data={difficulties}
              renderItem={difficultyItem}
              itemWidth={20}
              onChange = {handleNumberChange}
              defaultIndex = {difficulties.length}
              animatedScrollToDefaultIndex = {true}
            />
          </View>
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
  textInput: {
    width: "80%",
    borderRadius: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 150,
    margin: -10,
  },
  pickerWrapper1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    maxHeight: 120,
  },
  pickerWrapper2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    maxHeight: 120,
  },
  difficultyBox: {
    alignItems: "center",
    backgroundColor: "#FFD44D",
    borderRadius: 10,
  },
  questionPicker: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE5F88",
    borderRadius: 10,
  },
  topic: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
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
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "#7a42f4",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  wtf: {
    justifyContent: "left",
    fontWeight: "bold",
    fontSize: 25
  }
});
