import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { get_topics } from '../lib/external';

export default function Explore({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [topicResult, setTopicResult] = useState([]);

  const handlePressTopic = (topic) => {
    navigation.navigate("CreateQuiz", {
      topic: topic,
    });
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await get_topics();
      setIsLoading(false);
      setTopicResult(result);
    };

    fetchTopics();
  }, []);

  return (
    <ScrollView>
      <View>
        {topicResult.map((topic) => (
          <View key={topic.topic} style={styles.topicRow}>
            <Text style={styles.topicHeader}>{topic.topic}</Text>
            <ScrollView horizontal={true}>
              <View style={styles.subtopicsColumn}>
                {topic.subtopics.map((subtopic) => (
                  <TouchableOpacity onPress={() => handlePressTopic(subtopic)}>
                    <View style={styles.subtopic}>
                      <Text key={subtopic}>{subtopic}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View >
        ))
        }
      </View >
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicHeader: {
    fontSize: 30,
    marginLeft: 10,
  },
  topicRow: {
    padding: 10,
  },
  subtopicsColumn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  subtopic: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    margin: 10,
  },
});
