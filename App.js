import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import QuizScreen from "./screens/QuizScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <QuizScreen topic={"biology"} numberQuestions={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
