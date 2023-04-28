import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { getRecentTopics } from "../lib/external";

const defaultRecentTopics = ["Math", "Science", "Biology"];
export default function RecentTopics() {
  const [recentTopics, setRecentTopics] = useState(defaultRecentTopics);

  useEffect(() => {
    const fetchRecents = async () => {
      const recentTopics = await getRecentTopics();
      if (recentTopics !== null) setRecentTopics(() => recentTopics);
      else console.log("could not get user recent topics");
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
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    flexWrap: "wrap",
  },
  topic: {
    padding: 10,
    backgroundColor: "white",
    margin: 10,
  },
});
