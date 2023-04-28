import React, { useState, createContext, useEffect } from "react";
import * as BE from "../lib/external";

const defaultUser = {
  name: "Mason",
  questionCorrect: 0,
  recentTopics: ["Math", "Science", "Biology", "Reading"],
};

const UserContext = createContext(defaultUser);

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const checkRegistration = async () => {
      const name = await BE.getName();
      const questionCorrect = await BE.getQuestionCorrect();
      const recentTopics = await BE.getRecentTopics();
      if (name !== null) setUser((user) => ({ ...user, name: name }));
      else console.log("could not get user name, defaulting to default value");
      if (questionCorrect !== null)
        setUser((user) => ({ ...user, questionCorrect: questionCorrect }));
      else
        console.log(
          "could not get user questions correct, defaulting to default value"
        );
      if (recentTopics !== null)
        setRecentTopics((user) => ({ ...user, recentTopics: recentTopics }));
      else
        console.log(
          "could not get user recent topics, defaulting to default value"
        );
    };

    checkRegistration();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
