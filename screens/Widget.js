import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import myCamera from '../assets/myCamera.png';
import myQuiz from '../assets/myQuiz.png';
import myTrophy from '../assets/myTrophy.png';
import newQuiz from '../assets/newQuiz.png';

export default function Widget({ name, color }) {
  function getIcon() {
    switch (name) {
      case 'Create A Quiz':
        return newQuiz;
      case 'Explore Quizzes':
        return myQuiz;
      case 'Recent Topics':
        return myCamera;
      case 'Profile':
        return myTrophy;
    }
  }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      padding: 10,
      marginVertical: 5,
      borderBottomRightRadius: 100,
      borderTopRightRadius: 100,
      elevation: 5,
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      textAlign: 'center',
      fontSize: 26,
      color: 'white',
      fontWeight: 'bold',
      width: '100%',
      marginLeft: 5,
    },
    img: {
      height: 100,
      width: 100,
    },
    cols: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.cols}>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.cols}>
        <Image style={styles.img} source={getIcon()} />
      </View>
    </View >
  );
}


