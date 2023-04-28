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
    <ScrollView style={styles.topicRow}>
      <View>
        {topicResult.map((topic) => (
          <View key={topic.topic}>
            <Text style={styles.topicHeader}>{topic.topic}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.subtopicsColumn}>
                {topic.subtopics.map((subtopic) => (
                  <TouchableOpacity onPress={() => handlePressTopic(subtopic)}>
                    <View style={styles.subtopic}>
                      <Text style = {styles.text} key={subtopic}>{subtopic}</Text>
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
    paddingTop: 5,
    fontSize: 30,
    marginLeft: 15,
    color: "#FFFFFF",
    font: 'Courier Prime',  
    fontWeight: "bold",
  },
  topicRow: {
    padding: 10,
    backgroundColor: "#4051A6",
  },
  subtopicsColumn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtopic: {
    backgroundColor: '#BCD5D4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
  }
});
