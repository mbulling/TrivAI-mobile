import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Slider,
  Button,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loading from "./Loading";
import QuizScreen from "./QuizScreen";
import { get_topics } from "../lib/external";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import HorizontalPicker from "./HorizontalPicker";

export default function Multiplayer() {
  const [create, setCreate] = useState("Create");
  const [topic, setTopic] = useState("");
  const navigation = useNavigation();

  const data = [{ value: "Create" }, { value: "Join" }];

  const handlePressTakeQuiz = () => {
    navigation.navigate("Create", {
      topic: topic == "" ? "Null String Error Handling" : topic,
    });
  };

  const handleTextChange = (text) => {
    setTopic(text);
  };

  const radioButton = (data, onSelect) => {
    return (
      <View style={styles.radioButton}>
        {data.map((item) => {
          return (
            <Pressable
              style={
                item.value === create ? styles.selected : styles.unselected
              }
              onPress={() =>
                setCreate(item.value === "Create" ? "Create" : "Join")
              }
            >
              <Text> {item.value}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const joinScreen = () => {
    return (
      <View>
        <View>
          <Text>Enter Game Code:</Text>
          <TextInput
            style={styles.textInput2}
            inputMode={"numeric"}
            maxLength={4}
          />
        </View>

        <View>
          <Text>Enter Name:</Text>
          <TextInput style={styles.textInput2} />
        </View>

        <Button title="Join Game" />
      </View>
    );
  };

  const createScreen = () => {
    return (
      <View>
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
  };

  return (
    <View style={styles.container}>
      {radioButton(data, setCreate)}

      {create === "Join" ? joinScreen() : createScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    justifyContent: "center",
    width: "20%",
    alignItems: "left",
    marginBottom: 20,
    gap: 20,
  },
  selected: {
    backgroundColor: "#4051A6",
    justifyContent: "center",
    width: "80%",
    bottom: 0,
    alignItems: "center",
    shadowColor: "#363636",
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
  unselected: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: "80%",
    bottom: 0,
    alignItems: "center",
    shadowColor: "#363636",
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
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    margin: 45,
    marginBottom: 25,
  },
  topic: {
    marginTop: 80,
    marginBottom: 10,
    fontSize: 25,
    color: "#363636",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4051A6",
    justifyContent: "center",
    width: "80%",
    bottom: 0,
    alignItems: "center",
    shadowColor: "#363636",
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
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  textInput: {
    width: "80%",
    height: 50,
    borderColor: "#7a42f4",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    marginTop: 10,
  },
  textInput2: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
