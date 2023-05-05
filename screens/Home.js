import React, { useContext, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Widget from "./Widget";
import QuizScreen from "./QuizScreen";
import CreateQuiz from "./CreateQuiz";
import Explore from "./Explore";
import UserProfile from "./UserProfile";
import RecentTopics from "./RecentTopics";
import EnterTopic from './EnterTopic';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserContext from "../contexts/user";
import Registration from "./Registration";
import CreateQuizPassage from "./CreateQuizPassage";
import QuizScreenPassage from "./QuizScreenPassage"
import CameraScreen from "./Camera"
const Stack = createStackNavigator();

export default function Home() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  if (user.name === "") return <Registration />;
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeWidgets} options={{ headerShown: false }} />
      <Stack.Screen name="Create" component={CreateQuiz} />
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Profile" component={UserProfile} />
      <Stack.Screen name="Recents" component={RecentTopics} />
      <Stack.Screen name="Enter Topic" component={EnterTopic} />
      <Stack.Screen name="Create Quiz From Passage" component={CreateQuizPassage} />
      <Stack.Screen name="Quiz From Passage" component={QuizScreenPassage} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}

function HomeWidgets() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressCreateQuiz = () => {
    navigation.navigate('Enter Topic', { navigation });
  };

  const handlePressUserProfile = () => {
    navigation.navigate("Profile");
  };

  const handlePressExploreQuizzes = () => {
    navigation.navigate("Explore", { navigation });
  };

  const handlePressRecentTopics = () => {
    navigation.navigate("Recents");
  };

  const handlePressCV = () => {
    navigation.navigate("CameraScreen");
  }
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
    <LinearGradient
      colors={["#EE5F88", "#4051A6"]}
      style={styles.container}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Animated.View style={[styles.widgetRow, { opacity: fadeAnim }]}>
          {renderWidget("Create", "#4051A6", handlePressCreateQuiz, true)}
          {renderWidget("Explore", "#EE5F88", handlePressExploreQuizzes, false)}
          {/* {renderWidget("Recents", "#4051A6", handlePressRecentTopics, true)} */}
          {renderWidget("Profile", "#4051A6", handlePressUserProfile, true)}
          {renderWidget("Scanner", "#EE5F88", handlePressCV, false)}
        </Animated.View>
      </ScrollView>
    </LinearGradient >
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
    paddingTop: '6.5%',
    paddingBottom: '6.5%',
  },
  scroll: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
