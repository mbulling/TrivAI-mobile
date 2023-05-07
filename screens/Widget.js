import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Animated, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import myCamera from '../assets/myCamera.png';
import myQuiz from '../assets/myQuiz.png';
import myTrophy from '../assets/myTrophy.png';
import newQuiz from '../assets/newQuiz.png';
import UserPfp from '../assets/UserPfp.png';

export default function Widget({ name, color, left }) {
  const position = useRef(new Animated.Value(left ? -200 : 200)).current;
  // const [fontsLoaded] = useFonts({
  //   'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
  //   'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
  // });

  useEffect(() => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  // }, [fontsLoaded]);

  function getIcon() {
    switch (name) {
      case 'Create':
        return newQuiz;
      case 'Explore':
        return myQuiz;
      case 'Recents':
        return myCamera;
      case 'Profile':
        return UserPfp;
      case 'Scanner':
        return myCamera;
    }
  }

  const styles = StyleSheet.create({
    containerLeft: {
      backgroundColor: color,
      padding: 10,
      marginVertical: 0,
      borderBottomRightRadius: 100,
      borderTopRightRadius: 100,
      elevation: 5,
      width: '100%',
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    containerRight: {
      backgroundColor: color,
      padding: 10,
      marginVertical: 0,
      borderBottomLeftRadius: 100,
      borderTopLeftRadius: 100,
      elevation: 5,
      width: '100%',
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    shadow: {
      shadowColor: '#363636',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 0.3,
    },
    leftWrapper: {
      marginRight: 30,
    },
    rightWrapper: {
      marginLeft: 30,
    },
    text: {
      textAlign: 'center',
      fontSize: 28,
      color: 'white',
      fontWeight: 'bold',
      width: '100%',
      marginLeft: 10,
      fontWeight: 'bold',
      // fontFamily: 'Inter-Bold',
    },
    img: {
      flex: 1,
      aspectRatio: 1,
      margin: 15,
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

  // if (!fontsLoaded) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       {/* <ActivityIndicator size="large" color="#0000ff" /> */}
  //     </View>
  //   );
  // } else 
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


