import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Loading from './Loading';
import get_topic_mcq from '../lib/external';

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
      <Button onPress={handleGetMcq} title="Get MCQ" />
      {isLoading ? (
        <Loading />
      ) : (
        mcqResult.map((question, index) => (
          <View key={index}>
            <Text>{question.question}</Text>
            {question.options.map((option, optionIndex) => (
              <Text key={optionIndex}>{option}</Text>
            ))}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
