import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { getRecentTopics } from "../lib/external";
import UserContext from "../contexts/user";

export default function RecentTopics() {
  const { user } = useContext(UserContext);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.recents}>
        <View style={styles.topicsColumn}>
          {user.recentTopics.map((topic) => (
            <TouchableHighlight style={styles.highlight}>
              <Text style={styles.topic}>{topic}</Text>
            </TouchableHighlight>
          ))}
          <TouchableHighlight style={styles.highlight}>
            <Text style={styles.topic}>Algorithms</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.highlight}>
            <Text style={styles.topic}>Ford Fulkerson</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.highlight}>
            <Text style={styles.topic}>Discrete Math</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#BCD5D4",
  },
  recents: {
    margin: 10,
    padding: 10,
  },
  topicsColumn: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
    gap: "10%",
    backgroundColor: "#BCD5D4",
  },
  highlight: {
    borderColor: "black",
    borderWidth: 2,
    cornerRadius: 10,
    borderRadius: 10,
    backgroundColor: "#4051A6",
  },
  topic: {
    margin: 10,
    textAlign: "center",
    fontSize: 20,
  },
});
