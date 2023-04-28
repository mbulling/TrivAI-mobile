import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { getRecentTopics } from "../lib/external";
import UserContext from "../contexts/user";

export default function RecentTopics() {
  const { user } = useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.recents}>
        <View style={styles.topicsColumn}>
          {user.recentTopics.map((topic) => (
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
