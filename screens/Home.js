import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Loading from './Loading';
import get_topic_mcq from '../lib/external';
import Widget from './Widget';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [mcqResult, setMcqResult] = useState([]);

  const handleGetMcq = async () => {
    setIsLoading(true);
    const result = await get_topic_mcq();
    setIsLoading(false);
    setMcqResult(result);
  };

  return (
    <View style={styles.container}>
      <Widget name="Create A Quiz" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
});
