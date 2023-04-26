import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Loading from "./Loading";
import * as BE from "../lib/external";

const defaultUser = {
  name: "Mason",
  questionCorrect: 0,
  recentTopics: ["Math", "Science", "Biology"],
};

export default function UserProfile() {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const checkRegistration = async () => {
      const name = await BE.getName();
      const questionCorrect = await BE.getQuestionCorrect();
      const recentTopics = await BE.getRecentTopics();
      if (name !== null) setUser((user) => ({ ...user, name: name }));
      else console.log("could not get user name");
      if (questionCorrect !== null)
        setUser((user) => ({ ...user, questionCorrect: questionCorrect }));
      else console.log("could not get user questions correct");
      if (recentTopics !== null)
        setRecentTopics((user) => ({ ...user, recentTopics: recentTopics }));
      else console.log("could not get user recent topics");
    };

    checkRegistration();
  }, []);

  return (
    <ScrollView>
      <View style={styles.profile}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.userStats}>
          Questions Correct: {user.questionCorrect}
        </Text>
      </View>
      <View style={styles.recents}>
        <Text style={styles.userStats}>Recent Topics:</Text>
        <View style={styles.topicsColumn}>
          {user.recentTopics.length > 0
            ? user.recentTopics.map((topic) => (
                <Text style={styles.topic}>{topic}</Text>
              ))
            : null}
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
    color: "grey",
  },
  profile: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
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
