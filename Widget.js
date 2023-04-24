import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Widget({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 5,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
});
