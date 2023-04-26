import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import myCamera from '../assets/myCamera.png';
import myQuiz from '../assets/myQuiz.png';
import myTrophy from '../assets/myTrophy.png';
import newQuiz from '../assets/newQuiz.png';

export default function Widget({ name, color, left }) {
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
    containerLeft: {
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
    containerRight: {
      backgroundColor: color,
      padding: 10,
      marginVertical: 5,
      borderBottomLeftRadius: 100,
      borderTopLeftRadius: 100,
      elevation: 5,
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    shadow: {
      shadowColor: '#171717',
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    leftWrapper: {
      marginRight: 20,
    },
    rightWrapper: {
      marginLeft: 20,
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
      flex: 1,
      aspectRatio: 1,
      margin: 20,
    },
    cols: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (left) {
    return (
      <View style={styles.leftWrapper}>
        <View style={[styles.containerLeft, styles.shadow]}>
          <View style={styles.cols}>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.cols}>
            <Image style={styles.img} source={getIcon()} />
          </View>
        </View >
      </View>
    );
  } else {
    return (
      <View style={styles.rightWrapper}>
        <View style={[styles.containerRight, styles.shadow]}>
          <View style={styles.cols}>
            <Image style={styles.img} source={getIcon()} />
          </View>
          <View style={styles.cols}>
            <Text style={styles.text}>{name}</Text>
          </View>
        </View >
      </View>
    );
  }
}


