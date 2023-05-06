import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import Multiplayer from "./screens/Multiplayer";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/user";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Multiplayer />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  nav: {
    width: "100%",
  },
});
