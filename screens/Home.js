import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Widget from './Widget';
import QuestionScreen from './QuestionScreen';
import Explore from './Explore';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const handlePressCreateQuiz = () => {
    setCurrentScreen('QuestionScreen');
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
              <TouchableOpacity onPress={handlePressCreateQuiz} style={styles.widgetRow}>
                <Widget name="Create A Quiz" color="#0096FF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressExploreQuizzes} style={styles.widgetRow}>
                <Widget name="Explore Quizzes" color="#6495ED" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      case 'QuestionScreen':
        return <QuestionScreen />;
      case 'Explore':
        return <Explore />;
      default:
        return null;
    }
  };

  return renderScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  widgetRow: {
    width: '100%',
  },
  scroll: {
    width: '100%',
    marginTop: 70,
  }
});
