import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Loading from './Loading';
import { getName, getQuestionCorrect, getRecentTopics } from '../lib/external';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [questionCorrect, setQuestionCorrect] = useState(0);
  const [recentTopics, setRecentTopics] = useState([]);

  useEffect(() => {
    const checkRegistration = async () => {
      const result = await getName();
      setName('Mason');
      setQuestionCorrect(10);
      setRecentTopics(['Math', 'Science', 'History', 'English', 'Physics', 'Chemistry']);
    };

    checkRegistration();
  }, []);

  return (
    <ScrollView>
      <View style={styles.profile}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.userStats}>Questions Correct: {questionCorrect}</Text>
      </View>
      <View style={styles.recents}>
        <Text style={styles.userStats}>Recent Topics:</Text>
        <View style={styles.topicsColumn}>
          {recentTopics.map((topic) => (
            <Text style={styles.topic}>{topic}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    marginLeft: 10,
  },
  userStats: {
    fontSize: 20,
    color: 'grey',
  },
  profile: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recents: {
    margin: 10,
  },
  topicsColumn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    flexWrap: 'wrap',
  },
  topic: {
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
  },
});
