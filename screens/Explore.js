import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { get_topics } from '../lib/external';

export default function Explore({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [topicResult, setTopicResult] = useState([]);

  const handlePressTopic = (topic) => {
    navigation.navigate("Create", {
      topic: topic,
      roomID: 0
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
                  <TouchableOpacity onPress={() => handlePressTopic(subtopic)} style={styles.subcontainer}>
                    <View style={styles.subtopic}>
                      <Text style={styles.text} key={subtopic}>{subtopic}</Text>
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
    width: '100%',
  },
  subcontainer: {
    padding: 10,
    paddingLeft: 15,
  },
  topicHeader: {
    paddingTop: 15,
    fontSize: 26,
    color: "#FFFFFF",
    font: 'Courier Prime',
    fontWeight: "bold",
    paddingLeft: 15,
  },
  topicRow: {
    backgroundColor: "#4051A6",
    paddingTop: 10,
  },
  subtopicsColumn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subtopic: {
    backgroundColor: '#8c97ca',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    shadowColor: '#ffffff',
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 0
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    margin: 10,
  }
});
