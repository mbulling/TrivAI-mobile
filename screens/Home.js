import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Widget from './Widget';
import QuizScreen from './QuizScreen';
import CreateQuiz from './CreateQuiz';
import Explore from './Explore';
//import UserProfile from './UserProfile';
//import RecentTopics from './RecentTopics';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Home() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeWidgets} />
      <Stack.Screen name="CreateQuiz" component={CreateQuiz} />
      <Stack.Screen name="Explore" component={Explore} />
      {/* <Stack.Screen name="UserProfile" component={UserProfile} /> */}
      {/* <Stack.Screen name="RecentTopics" component={RecentTopics} /> */}
    </Stack.Navigator>
  );
}

function HomeWidgets() {
  const navigation = useNavigation();

  const handlePressCreateQuiz = () => {
    navigation.navigate('CreateQuiz');
  };

  const handlePressUserProfile = () => {
    navigation.navigate('UserProfile');
  };

  const handlePressExploreQuizzes = () => {
    navigation.navigate('Explore');
  };

  const handlePressRecentTopics = () => {
    navigation.navigate('RecentTopics');
  };

  const renderWidget = (name, color, onPress) => {
    return (
      <View style={styles.widgetRow}>
        <TouchableOpacity style={{ width: '100%' }} onPress={onPress}>
          <Widget name={name} color={color} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.widgetRow}>
          {renderWidget('Create A Quiz', '#0096FF', handlePressCreateQuiz)}
          {renderWidget('Explore Quizzes', '#6495ED', handlePressExploreQuizzes)}
          {renderWidget('Recent Topics', '#1F51FF', handlePressRecentTopics)}
          {renderWidget('Profile', '#3F00FF', handlePressUserProfile)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  widgetRow: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  scroll: {
    width: '100%',
    flex: 1,
  },
});
