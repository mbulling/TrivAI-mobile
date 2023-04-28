import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AWS_HOST from "./key";

const host = AWS_HOST || "";

export async function get_topic_mcq(topic, num_questions) {
  try {
    const response = await axios.post(`${host}/get_mcq_topic`, {
      topic: topic,
      num_questions: num_questions,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function get_topics() {
  try {
    const response = await axios.get(`${host}/get_explore`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const setName = async (name) => {
  const nameExist = await AsyncStorage.getItem("@name");
  if (nameExist !== null) {
    console.log("warning: name already defined in user storage");
    console.log(`setting name from ${nameExist} to name`);
    AsyncStorage.setItem("@name", name);
    return;
  }
  AsyncStorage.setItem("@name", name);
};

const incrQuestionCorrect = async () => {
  const qCorrect = await AsyncStorage.getItem("@qCorrect");
  if (qCorrect === null) {
    AsyncStorage.setItem("@qCorrect", 1);
    return;
  }
  AsyncStorage.setItem("@qCorrect", qCorrect + 1);
};

const appendRecentTopics = async (recentTopic) => {
  const recentTopics = await AsyncStorage.getItem("@recentTopics");
  if (recentTopic === null) {
    AsyncStorage.setItem("@recentTopics", JSON.stringify([recentTopic]));
    return;
  }

  const updatedTopics = JSON.parse(recentTopic);
  updatedTopics.push(recentTopic);
  AsyncStorage.setItem("@recentTopics", JSON.stringify(updatedTopics));
};

const getName = async () => {
  return await AsyncStorage.getItem("@name");
};

const getQuestionCorrect = async () => {
  return await AsyncStorage.getItem("@qCorrect");
};

const getRecentTopics = async () => {
  return await AsyncStorage.getItem("@recentTopics");
};

export {
  setName,
  getName,
  getRecentTopics,
  getQuestionCorrect,
  appendRecentTopics,
  incrQuestionCorrect,
};
