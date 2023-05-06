import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import UserContext from "../contexts/user";
import { get_results } from "../lib/external";

export default function MultiplayerFinish({ route }) {
  const { navigation, gameID } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await get_results(gameID); // make API call to get results
      setData(results); // update state with fetched data
    }
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text style={styles.item}>{`${item.name}`}</Text>
        <Text style={styles.item}>{`${item.score}`}</Text>
      </View>
    );
  };


  const _navigationHandler = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.containerStyle}>
      <View style={styles.container1}>
        <View style={styles.profile}>
          <Text style={styles.name}>Top 5 uhhhhhh</Text>
          <Text style={styles.leaderboard}>Leaderboard</Text>
          {renderItem(data)}
        </View>


        <ScrollView style={styles.scroll}>
          <View style={styles.container2}>
            <View style={styles.spacer}>{/* Spacer */}</View>
          </View>
        </ScrollView>

        <View style={styles.button}>
          <Pressable
            style={styles.finishBtn}
            onPress={() => _navigationHandler("Home")}
          >
            <Text style={styles.finishBtnText}>Go Home</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    padding: 2.4,
    alignContent: "center",
    backgroundColor: "#4051A6",
    height: "90%",
  },
  containerStyle: {
    backgroundColor: "#4051A6",
    height: "100%",
  },
  name: {
    fontSize: 30,
    marginLeft: 10,
    color: "white",
    fontFamily: "Inter-Bold",
    fontWeight: "bold",
    marginTop: 35,
  },
  leaderboard: {
    fontSize: 30,
    marginLeft: 10,
    color: "white",
    fontFamily: "Inter-Bold",
    fontWeight: "bold",
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
  userNumbers: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  right: {
    padding: 10,
    alignItems: "right",
    fontSize: 30,
    color: "white",
    // fontFamily: "Inter-Bold",
    fontWeight: "bold",
    flex: 1,
  },
  left: {
    padding: 10,
    alignItems: "left",
    fontSize: 30,
    color: "white",
    // fontFamily: "Inter-Bold",
    fontWeight: "bold",
  },
  item: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 10,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    fontWeight: "bold",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: "22px",
  },
  spacer: {
    padding: 80,
  },
  finishBtn: {
    padding: 20,
    backgroundColor: "#EE5F88",
    borderRadius: 30,
    width: "70%",
    margin: 5,
    alignItems: "center",
    shadowColor: "#363636",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  finishBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    paddingTop: "-100%",
    alignItems: "center",
  },
});
