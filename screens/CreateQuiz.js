import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Slider, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Loading from './Loading';
import QuizScreen from './QuizScreen';
import { get_topics } from '../lib/external';
import { useNavigation } from '@react-navigation/native';
import NavigationContainer from '@react-navigation/native';

export default function CreateQuiz() {
  const [topic, setTopic] = useState('');
  const [num_questions, setNumber] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const navigation = useNavigation();

  const handlePressTakeQuiz = () => {
    navigation.navigate('QuizScreen', { topic: topic, numberQuestions: num_questions });
  };

  const handleTextChange = (text) => {
    setTopic(text);
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDifficultyChange = (difficulty) => {
    setDifficulty(difficulty);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Quiz</Text>
      <Text>Enter topic:</Text>
      <TextInput
        style={styles.textInput}
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
      <Button title="Start Quiz" onPress={handlePressTakeQuiz} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '80%',
    height: 40,
    backgroundColor: '#E5E4E2',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 36,
  },
});
