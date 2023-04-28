import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Widget from "./Widget";
import QuizScreen from "./QuizScreen";
import CreateQuiz from "./CreateQuiz";
import Explore from "./Explore";
import UserProfile from "./UserProfile";
import RecentTopics from "./RecentTopics";
import EnterTopic from "./EnterTopic";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserContext from "../contexts/user";
import Registration from "./Registration";
import { TouchableHighlight } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Stack = createStackNavigator();

const backButton = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
<path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
</svg>
`;

export default function Home() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  if (user.name === "") return <Registration />;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeWidgets}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CreateQuiz" component={CreateQuiz} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen
        name="RecentTopics"
        component={RecentTopics}
        options={{
          title: "Recent Topics",
          headerStyle: {
            backgroundColor: "#BCD5D4",
          },
          headerLeft: () => (
            <SvgXml
              xml={backButton}
              onPress={() => navigation.goBack()}
              width="100%"
              height="100%"
            ></SvgXml>
          ),
        }}
      />
      <Stack.Screen name="EnterTopic" component={EnterTopic} />
    </Stack.Navigator>
  );
}

function HomeWidgets() {
  const navigation = useNavigation();

  const handlePressCreateQuiz = () => {
    navigation.navigate("EnterTopic", { navigation });
  };

  const handlePressUserProfile = () => {
    navigation.navigate("UserProfile");
  };

  const handlePressExploreQuizzes = () => {
    navigation.navigate("Explore", { navigation });
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
    <LinearGradient colors={["#1F51FF", "#0096FF"]} style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.widgetRow}>
          {renderWidget("Create Quiz", "#0096FF", handlePressCreateQuiz, true)}
          {renderWidget(
            "Explore Quizzes",
            "#6495ED",
            handlePressExploreQuizzes,
            true
          )}
          {renderWidget(
            "Recent Topics",
            "#1F51FF",
            handlePressRecentTopics,
            false
          )}
          {renderWidget("Profile", "#3F00FF", handlePressUserProfile, false)}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  widgetRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingTop: 10,
  },
  scroll: {
    width: "100%",
    flex: 1,
  },
});
