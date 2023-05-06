import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Slider,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Loading from "./Loading";
import QuizScreen from "./QuizScreen";
import { get_topics, generateGameID } from "../lib/external";
import { useNavigation } from "@react-navigation/native";
import NavigationContainer from "@react-navigation/native";
import HorizontalPicker from "./HorizontalPicker";

export default function Multiplayer() {
  const [create, setCreate] = useState("Create");
  const [topic, setTopic] = useState("");
  const [roomID, setRoomID] = useState(generateGameID().toString());
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
      <View keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.topic}>Enter Game Code</Text>
          <TextInput
            style={styles.textInput2}
            inputMode={"numeric"}
            maxLength={4}
            placeholder="1234"
          />
        </View>

        <View>
          <Text style={styles.topic}>Enter Name</Text>
          <TextInput style={styles.textInput2} placeholder="John Doe" />
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
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

        <View>
          <Text style={styles.topic}>
            Room Code: <Text style={{ color: "#4051A6" }}>{roomID}</Text>
          </Text>
        </View>

        <View>
          <Text>Enter Name:</Text>
          <TextInput style={styles.textInput2} placeholder="John Doe" />
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
            <Text style={[styles.buttonText, { textAlign: "center" }]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {radioButton(data, setCreate)}
        {create === "Join" ? joinScreen() : createScreen()}
      </View>
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
    marginBottom: 0,
  },
  topic: {
    marginTop: 80,
    marginBottom: 10,
    fontSize: 25,
    color: "#363636",
    fontWeight: "bold",
    textAlign: "center",
  },
  roomCode: {
    marginBottom: 10,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    borderColor: "#363636",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4051A6",
    justifyContent: "center",
    width: "80%",
    bottom: 0,
    shadowColor: "#363636",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    margin: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
    borderRadius: 10,
    height: 60,
    textAlign: "center",
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
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    marginTop: 10,
  },
  textInput2: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: "#7a42f4",
    width: "80%",
  },
});
