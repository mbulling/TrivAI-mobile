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

export default function Multiplayer({ navigation }) {
  const [create, setCreate] = useState("Create");
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState(generateGameID().toString());

  const data = [{ value: "Create" }, { value: "Join" }];

  const handlePressTakeQuiz = () => {
    navigation.navigate("Create", {
      topic: topic == "" ? "Null String Error Handling" : topic,
      roomID: roomID,
      name: name,
    });
  };

  const handleTextChange = (text) => {
    setTopic(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };


  const radioButton = (data, onSelect) => {
    return (
      <View style={styles.radioButton}>
        {data.map((item) => {
          return (
            <Pressable
              style={item.value === create ? styles.selected : styles.unselected}
              onPress={() =>
                setCreate(item.value === "Create" ? "Create" : "Join")
              }
            >
              <Text style={item.value === create ? styles.selectedRadio : styles.unselectedRadio}> {item.value}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  const joinScreen = () => {
    return (
      <View keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.room}>
            <Text style={styles.topic}>Enter Game Code:</Text>
            <TextInput
              style={styles.textInput}
              inputMode={"numeric"}
              maxLength={4}
              placeholder="0000"
            />
          </View>

          <View style={styles.room}>
            <Text style={styles.topic}>Enter Name:</Text>
            <TextInput style={styles.textInput} />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const createScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.room}>
            <Text style={styles.topic}>Enter Topic:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleTextChange}
              value={topic}
            />
          </View>
          <View style={styles.room}>
            <Text style={styles.topic}>Enter Name:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleNameChange}
              value={name}
            />
          </View>
          <View style={styles.room}>
            <Text style={styles.code}>Room Code: {roomID}</Text>
            <Text style={styles.share}>Share this code with your friends.</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePressTakeQuiz}>
          <Text style={styles.buttonText}>Create Game</Text>
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
    width: "50%",
    alignItems: "left",
    gap: 10,
  },
  room: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  selectedRadio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  share: {
    fontSize: 20,
  },
  code: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
  },
  unselectedRadio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4051A6",
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
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  subContainer: {
    flex: 1,
    paddingTop: "20%",
    alignItems: "center",
    width: "100%",
  },
  topic: {
    fontSize: 25,
    color: "#363636",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4051A6",
    justifyContent: "center",
    width: "80%",
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
    padding: 10,
    marginBottom: 32,
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
    width: "80%",
    marginTop: 10,
  },
});
