import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Please be patient. This could take up to 20 seconds.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 12,
    fontWeight: 'bold',
    width: '40%',
    textAlign: 'center',
    padding: 20,
    color: '#0000ff',
  },
});
