import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Animated } from 'react-native';
import myCamera from '../assets/myCamera.png';
import myQuiz from '../assets/myQuiz.png';
import myTrophy from '../assets/myTrophy.png';
import newQuiz from '../assets/newQuiz.png';

export default function Widget({ name, color, left }) {
  const position = useRef(new Animated.Value(left ? -200 : 200)).current;

  useEffect(() => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  function getIcon() {
    switch (name) {
      case 'Create Quiz':
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
      shadowColor: '#3d3d3d',
      shadowOffset: { width: -1, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
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

  const animatedStyles = {
    transform: [
      {
        translateX: position,
      },
    ],
  };

  if (left) {
    return (
      <View style={styles.leftWrapper}>
        <Animated.View style={[styles.containerLeft, styles.shadow, animatedStyles]}>
          <View style={styles.cols}>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.cols}>
            <Image style={styles.img} source={getIcon()} />
          </View>
        </Animated.View >
      </View>
    );
  } else {
    return (
      <View style={styles.rightWrapper}>
        <Animated.View style={[styles.containerRight, styles.shadow, animatedStyles]}>
          <View style={styles.cols}>
            <Image style={styles.img} source={getIcon()} />
          </View>
          <View style={styles.cols}>
            <Text style={styles.text}>{name}</Text>
          </View>
        </Animated.View >
      </View>
    );
  }
}


