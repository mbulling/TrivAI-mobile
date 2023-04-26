import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { getRecentTopics } from '../lib/external';

export default function RecentTopics() {
  const [recentTopics, setRecentTopics] = useState([]);

  useEffect(() => {
    const fetchRecents = async () => {
      const result = await getRecentTopics();
      setRecentTopics(['Math', 'Science', 'History', 'English', 'Physics', 'Chemistry']);
    };

    fetchRecents();
  }, []);

  return (
    <ScrollView>
      <View style={styles.recents}>
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
