import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Widget({ name, color }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      elevation: 5,
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 26,
      color: 'white',
      fontWeight: 'bold',
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View >
  );
}


