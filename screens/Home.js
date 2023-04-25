import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Widget from './Widget';
import QuizScreen from './QuizScreen';
import CreateQuiz from './CreateQuiz';
import Explore from './Explore';
import UserProfile from './UserProfile';
import RecentTopics from './RecentTopics';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const handlePressCreateQuiz = () => {
    setCurrentScreen('CreateQuiz');
  };

  const handlePressRecentTopics = () => {
    setCurrentScreen('RecentTopics');
  };

  const handlePressUserProfile = () => {
    setCurrentScreen('UserProfile');
  };

  const handlePressExploreQuizzes = () => {
    setCurrentScreen('Explore');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <View style={styles.container}>
            <ScrollView style={styles.scroll}>
              <View style={styles.spacer} />
              <TouchableOpacity onPress={handlePressCreateQuiz} style={styles.widgetRow}>
                <Widget name="Create A Quiz" color="#0096FF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressExploreQuizzes} style={styles.widgetRow}>
                <Widget name="Explore Quizzes" color="#6495ED" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressRecentTopics} style={styles.widgetRow}>
                <Widget name="Recent Topics" color="#1F51FF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressUserProfile} style={styles.widgetRow}>
                <Widget name="Profile" color="#3F00FF" />
              </TouchableOpacity>
              <View style={styles.spacer} />
            </ScrollView>
          </View>
        );
      case 'CreateQuiz':
        return <CreateQuiz />;
      case 'Explore':
        return <Explore />;
      case 'UserProfile':
        return <UserProfile />;
      case 'RecentTopics':
        return <RecentTopics />;
      default:
        return null;
    }
  };

  return renderScreen();
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '90%',
  },
  widgetRow: {
    width: '100%',
    height: '25%',
  },
  scroll: {
    width: '100%',
  },
  spacer: {
    height: '15%',
  }
});
