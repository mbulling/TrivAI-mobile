import React, { useState, useEffect, useNavigation } from 'react';
import { StyleSheet, View, Text, TextInput, Slider, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Loading from './Loading';
import QuizScreen from './QuizScreen';
import { get_topics } from '../lib/external';

export default function CreateQuiz() {
  const [topic, setTopic] = useState('');
  const [num_questions, setNumber] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  //const navigation = useNavigation();

  const handleTextChange = (text) => {
    setTopic(text);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  // const handleQuizStart = () => {
  //   // Navigate to QuizScreen with topic, num_questions, and difficulty state values as params
  //   navigation.navigate('Quiz', { topic, num_questions, difficulty });
  // };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enter topic:</Text>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
        onChangeText={handleTextChange}
        value={topic}
      />
      <Text>Select number of questions:</Text>
      <Slider
        style={{ width: '80%', marginTop: 10 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={num_questions}
        onValueChange={handleNumberChange}
      />
      <Text>Select difficulty:</Text>
      <Picker
        style={{ width: '80%', marginTop: 10 }}
        selectedValue={difficulty}
        onValueChange={handleDifficultyChange}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
      {/* <Button title="Start Quiz" onPress={handleQuizStart} /> */}
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
