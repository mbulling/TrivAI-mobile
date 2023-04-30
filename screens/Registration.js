import React, { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import UserContext from "../contexts/user";
import { View, Button, Text, TextInput, Animated, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as BE from "../lib/external";

const Stack = createStackNavigator();
const Registration = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen
        name="Register"
        children={(props) => <Register setUser={setUser} {...props} />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Landing = ({ navigation }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => navigation.navigate("Register"));
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <LinearGradient
        colors={["#EE5F88", "#4051A6"]}
        style={styles.landingScreen} />
    </Animated.View>
  );
};

const Register = ({ setUser }) => {
  const [name, onChangeName] = useState("");

  const _registrationHandler = async () => {
    await BE.setName(name);
    setUser((prev) => ({ ...prev, name: name }));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome to TrivAI</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>What is your name?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeName}
          value={name}
          placeholder={"Enter your name."}
          keyboardType={"default"}
        />
        <TouchableOpacity onPress={_registrationHandler} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 50,
  },
  wrapper: {
    flex: 1,
  },
  welcome: {
    backgroundColor: "#EE5F88",
    width: "100%",
    padding: 20,
    paddingTop: 100,
    paddingBottom: 50,
  },
  welcomeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 36,
    textAlign: "center",
    overflow: "wrap",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    overflow: "wrap",
    color: "#4051A6",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#4051A6",
    borderRadius: 10,
    padding: 10,
    marginRight: 0,
    marginLeft: "auto",
    width: 60,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  landingScreen: {
    width: "100%",
    height: "100%",
  },
});

export default Registration;
