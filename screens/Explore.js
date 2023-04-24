import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Loading from './Loading';
import { get_topics } from '../lib/external';

export default function Explore() {
  const [isLoading, setIsLoading] = useState(true);
  const [topicResult, setTopicResult] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await get_topics();
      setIsLoading(false);
      setTopicResult(result);
    };

    fetchTopics();
  }, []);

  return (
    <View>
      {topicResult.map((topic) => (
        <View key={topic.topic}>
          <Text>{topic.topic}</Text>
          <View>
            {topic.subtopics.map((subtopic) => (
              <Text key={subtopic}>{subtopic}</Text>
            ))}
          </View>
        </View>
      ))}
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
