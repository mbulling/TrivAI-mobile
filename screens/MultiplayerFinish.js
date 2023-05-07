// import React, { useContext, useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   Pressable,
// } from "react-native";
// import Loading from "./Loading";
// import { get_results, add_player } from "../lib/external";

// export default function MultiplayerFinish({ route, navigation }) {
//   const { gameID, name, score } = route.params;
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       const results = await get_results(gameID); // make API call to get results
//       setData(results); // update state with fetched data
//       console.log(results);
//       setLoading(false);
//       await add_player(parseInt(gameID), name, score);
//     }
//     fetchData();
//   }, [loading]);

//   var dataLeft = [];
//   var dataRight = [];

//   if (loading) {
//     return <Loading />;
//   } else {
//     if (data !== undefined) {
//       for (let i = 0; i < data.length; i++) {
//         if (data[i][0] !== undefined) {
//           dataLeft.push({ key: data[i][0] });
//         }
//       }
//       var dataRight = [];
//       for (let i = 0; i < data.length; i++) {
//         if (data[i][1] !== undefined) {
//           dataRight.push({ key: data[i][1] });
//         }
//       }
//     }
//   }

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.item}>
//         <Text style={styles.text}>{item.key}</Text>
//       </View>
//     );
//   };

//   const _navigationHandler = (screenName) => {
//     navigation.navigate(screenName);
//   };

//   return (
//     <View style={styles.containerStyle}>
//       <View style={styles.container1}>
//         <View style={styles.profile}>
//           <Pressable onPress={() => setLoading(!loading)}>
//             <Text style={styles.name}>Leaderboard</Text>
//           </Pressable>
//         </View>

//         <ScrollView style={styles.scroll}>
//           <View style={styles.container2}>
//             <View>
//               <FlatList data={dataLeft} renderItem={renderItem} />
//             </View>
//             <View style={styles.spacer}>{/* Spacer */}</View>
//             <View>
//               <FlatList data={dataRight} renderItem={renderItem} />
//             </View>
//           </View>
//         </ScrollView>

//         <View style={styles.button}>
//           <Pressable
//             style={styles.finishBtn}
//             onPress={() => _navigationHandler("Home")}
//           >
//             <Text style={styles.finishBtnText}>Go Home</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container1: {
//     padding: 2.4,
//     alignContent: "center",
//     backgroundColor: "#4051A6",
//     height: "90%",
//   },
//   containerStyle: {
//     backgroundColor: "#4051A6",
//     height: "100%",
//   },
//   name: {
//     fontSize: 35,
//     paddingBottom: 15,
//     marginLeft: 10,
//     color: "white",
//     fontFamily: "Inter-Bold",
//     fontWeight: "bold",
//     marginTop: 35,
//   },
//   leaderboard: {
//     fontSize: 30,
//     marginLeft: 10,
//     color: "white",
//     fontFamily: "Inter-Bold",
//     fontWeight: "bold",
//   },
//   userStats: {
//     fontSize: 20,
//     color: "white",
//   },
//   profile: {
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   recents: {
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 10,
//     padding: 10,
//   },
//   topicsColumn: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     padding: 10,
//     flexWrap: "wrap",
//   },
//   topic: {
//     padding: 10,
//     backgroundColor: "white",
//     margin: 10,
//     borderRadius: 6,
//     overflow: "hidden",
//   },
//   userNumbers: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   right: {
//     padding: 10,
//     alignItems: "right",
//     fontSize: 30,
//     color: "white",
//     fontWeight: "bold",
//     flex: 1,
//   },
//   left: {
//     padding: 10,
//     alignItems: "left",
//     fontSize: 30,
//     color: "white",
//     fontWeight: "bold",
//   },
//   item: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "white",
//     paddingVertical: 10,
//   },
//   container2: {
//     flex: 1,
//     flexDirection: "row",
//     fontWeight: "bold",
//     justifyContent: "center",
//   },
//   text: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: "22px",
//   },
//   spacer: {
//     padding: 80,
//   },
//   finishBtn: {
//     padding: 20,
//     backgroundColor: "#EE5F88",
//     borderRadius: 30,
//     width: "70%",
//     margin: 5,
//     alignItems: "center",
//     shadowColor: "#363636",
//     shadowOffset: {
//       width: 5,
//       height: 5,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 0,
//   },
//   finishBtnText: {
//     textAlign: "center",
//     color: "#FFFFFF",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   button: {
//     paddingTop: "-100%",
//     alignItems: "center",
//   },
// });
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";

import { get_results } from "../lib/external";

export default function MultiplayerFinish({ route, navigation }) {
  const { gameID } = route.params;
  const [data, setData] = useState([['Mason', 1]]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const results = await get_results(gameID); // make API call to get results
      setData(results); // update state with fetched data
      console.log(results);
    }
    fetchData();
  }, []);

  const dataLeft = [];
  for (let i = 0; i < data.length; i++) {
    dataLeft.push({ key: data[i][0] });
  }
  const dataRight = [];
  for (let i = 0; i < data.length; i++) {
    dataRight.push({ key: data[i][1] });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.key}</Text>
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
          <Pressable onPress={() => setLoading(!loading)}>
            <Text style={styles.name}>Leaderboard</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.scroll}>
          <View style={styles.container2}>
            <View>
              <FlatList data={dataLeft} renderItem={renderItem} />
            </View>
            <View style={styles.spacer}>{/* Spacer */}</View>
            <View>
              <FlatList data={dataRight} renderItem={renderItem} />
            </View>
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
    fontSize: 35,
    paddingBottom: 15,
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
    fontWeight: "bold",
    flex: 1,
  },
  left: {
    padding: 10,
    fontSize: 30,
    color: "white",
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
    fontSize: 22,
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

