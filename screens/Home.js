import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import Widget from "./Widget";
import QuizScreen from "./QuizScreen";
import CreateQuiz from "./CreateQuiz";
import Explore from "./Explore";
import UserProfile from "./UserProfile";
import RecentTopics from "./RecentTopics";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserContext from "../contexts/user";
import Registration from "./Registration";

const Stack = createStackNavigator();

export default function Home() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  if (user.name === "") return <Registration />;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeWidgets} />
      <Stack.Screen name="CreateQuiz" component={CreateQuiz} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="RecentTopics" component={RecentTopics} />
    </Stack.Navigator>
  );
}

function HomeWidgets() {
  const navigation = useNavigation();

  const handlePressCreateQuiz = () => {
    navigation.navigate("CreateQuiz", { navigation });
  };

  const handlePressUserProfile = () => {
    navigation.navigate("UserProfile");
  };

  const handlePressExploreQuizzes = () => {
    navigation.navigate("Explore");
  };

  const handlePressRecentTopics = () => {
    navigation.navigate("RecentTopics");
  };

  const renderWidget = (name, color, onPress, left) => {
    return (
      <View style={styles.widgetRow}>
        <TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
          <Widget name={name} color={color} left={left} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.widgetRow}>
          {renderWidget(
            "Create A Quiz",
            "#0096FF",
            handlePressCreateQuiz,
            true
          )}
          {renderWidget(
            "Explore Quizzes",
            "#6495ED",
            handlePressExploreQuizzes,
            false
          )}
          {renderWidget(
            "Recent Topics",
            "#1F51FF",
            handlePressRecentTopics,
            true
          )}
          {renderWidget("Profile", "#3F00FF", handlePressUserProfile, false)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  widgetRow: {
    width: "100%",
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  scroll: {
    width: "100%",
    flex: 1,
  },
});
