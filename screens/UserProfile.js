import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as BE from "../lib/external";
import UserContext from "../contexts/user";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.userStats}>
          Questions Correct: {user.questionsCorrect}
        </Text>
      </View>
      <View style={styles.recents}>
        <View style={styles.topicsColumn}>
          {user.recentTopics.length > 0
            ? user.recentTopics.map((topic, i) => (
              <Text key={i} style={styles.topic}>
                {topic}
              </Text>
            ))
            : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignContent: "center",
    backgroundColor: "#4051A6",
  },
  name: {
    fontSize: 40,
    marginLeft: 10,
    color: "white",
    fontFamily: "Inter-Bold",
    marginTop: 20,
  },
  userStats: {
    fontSize: 20,
    color: "white",
  },
  profile: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

  },
  recents: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
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
    borderRadius: 6,
    overflow: "hidden",
  },
});
