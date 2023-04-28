import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/user";
import { View, Button, Text, TextInput, Animated } from "react-native";
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
      />
    </Stack.Navigator>
  );
};

const Landing = ({ navigation }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => navigation.navigate("Register"));
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Text>Landing Page</Text>
      <Button onPress={() => navigation.navigate("Register")} title="Sign up" />
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
    <View>
      <Text>Registration Page</Text>
      <TextInput
        onChangeText={onChangeName}
        value={name}
        placeholder={"Enter your name."}
        keyboardType={"default"}
      />
      <Button onPress={_registrationHandler} title="register" />
    </View>
  );
};

export default Registration;
