import React, { useState, createContext } from "react";

const defaultUser = {
  name: "Mason",
  questionCorrect: 0,
  recentTopics: ["Math", "Science", "Biology", "Reading"],
};

const UserContext = createContext(defaultUser);

export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
