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

export async function get_passage_mcq(passage, num_questions) {
  try {
    const response = await axios.post(`${host}/get_mcq_passage`, {
      passage: passage,
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
  const qCorrect = await AsyncStorage.getItem("@qCorrect").then((res) =>
    Number(res)
  );
  if (qCorrect === null) {
    AsyncStorage.setItem("@qCorrect", "1");
    return;
  }
  AsyncStorage.setItem("@qCorrect", JSON.stringify(qCorrect + 1));
};

const incrQuestionTotal = async () => {
  const qTotal = await AsyncStorage.getItem("@qTotal").then((res) =>
    Number(res)
  );
  if (qTotal === null) {
    AsyncStorage.setItem("@qTotal", "1");
    return;
  }
  AsyncStorage.setItem("@qTotal", JSON.stringify(qTotal + 1));
};

const incrNumQuizzes = async () => {
  const numQuizzes = await AsyncStorage.getItem("@numQuizzes").then((res) =>
    Number(res)
  );
  if (numQuizzes === null) {
    AsyncStorage.setItem("@numQuizzes", "1");
    return;
  }
  AsyncStorage.setItem("@numQuizzes", JSON.stringify(numQuizzes + 1));
};

const appendRecentTopics = async (recentTopic) => {
  const recentTopics = await AsyncStorage.getItem("@recentTopics");
  if (recentTopics === null) {
    AsyncStorage.setItem("@recentTopics", JSON.stringify([recentTopic]));
    return;
  }
  const updatedTopics = [
    ...new Set([...JSON.parse(recentTopics), recentTopic]),
  ];

  AsyncStorage.setItem("@recentTopics", JSON.stringify(updatedTopics));
};

const getName = async () => {
  return await AsyncStorage.getItem("@name");
};

const getQuestionCorrect = async () => {
  return await AsyncStorage.getItem("@qCorrect").then((res) => JSON.parse(res));
};

const getQuestionTotal = async () => {
  return await AsyncStorage.getItem("@qTotal").then((res) => JSON.parse(res));
};

const getNumQuizzes = async () => {
  return await AsyncStorage.getItem("@numQuizzes").then((res) => JSON.parse(res));
};

const getRecentTopics = async () => {
  return await AsyncStorage.getItem("@recentTopics").then((res) =>
    JSON.parse(res)
  );
};

export {
  setName,
  getName,
  getRecentTopics,
  getQuestionCorrect,
  getQuestionTotal,
  getNumQuizzes,
  appendRecentTopics,
  incrQuestionCorrect,
  incrQuestionTotal,
  incrNumQuizzes,
};