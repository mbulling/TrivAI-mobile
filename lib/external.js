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

// Returns results of a game as unordered json
export async function get_results(gameID) {
  try {
    const response = await axios.post(`${host}/get_results`, {
      game_id: gameID,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Returns results of a game as ordered list of tuples ('mason', 5)
export async function get_results_ordered(gameID) {
  return get_results(gameID).then((res) => {
    const results = [];
    for (let i = 0; i < res.length; i++) {
      results.push([res[i], res[i][1]]);
    }
    results.sort((a, b) => a[1] - b[1]);
    return results;
  });
}

// Create multiplayer game
export async function create_game(gameID, topic, num_questions) {
  try {
    const questionsList = await get_topic_mcq(topic, num_questions);
    const response = await axios.post(`${host}/create_game`, {
      game_id: gameID,
      topic: topic,
      questions: questionsList,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Get quiz info (title, number of players, and list of questions)
export async function get_quiz_info(gameID) {
  try {
    const response = await axios.post(`${host}/get_game`, {
      game_id: gameID,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Add player to multiplayer game after finish
export async function add_player(gameID, name, score) {
  try {
    const response = await axios.post(`${host}/add_player`, {
      game_id: gameID,
      name: name,
      score: score,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const generateGameID = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

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
  return await AsyncStorage.getItem("@numQuizzes").then((res) =>
    JSON.parse(res)
  );
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
  generateGameID,
};
