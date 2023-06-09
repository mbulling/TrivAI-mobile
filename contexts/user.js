import React, { useState, createContext, useEffect } from "react";
import * as BE from "../lib/external";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultUser = {
  name: "",
  questionsCorrect: 0,
  questionsTotal: 0,
  recentTopics: [],
};

const UserContext = createContext(defaultUser);

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const checkRegistration = async () => {
      const name = await BE.getName();
      const questionCorrect = await BE.getQuestionCorrect();
      const questionTotal = await BE.getQuestionTotal();
      const recentTopics = await BE.getRecentTopics();
      if (name !== null) setUser((user) => ({ ...user, name: name }));
      else console.log("could not get user name, defaulting to default value");
      if (questionCorrect !== null)
        setUser((user) => ({ ...user, questionsCorrect: questionCorrect }));
      else
        console.log(
          "could not get user questions correct, defaulting to default value"
        );
      if (questionTotal !== null)
        setUser((user) => ({ ...user, questionsTotal: questionTotal }));
      else
        console.log(
          "could not get user questions answered, defaulting to default value"
        );
      if (recentTopics !== null)
        setUser((user) => ({ ...user, recentTopics: recentTopics }));
      else
        console.log(
          "could not get user recent topics, defaulting to default value"
        );
    };
    // AsyncStorage.clear();
    checkRegistration();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};