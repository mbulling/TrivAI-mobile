import React, { createContext } from "react";

const defaultUser = {
  name: "Mason",
  questionCorrect: 0,
  recentTopics: ["Math", "Science", "Biology"],
};

const UserContext = createContext(null);
export default UserContext;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider values={(user, setUser)}>
      {children}
    </UserContext.Provider>
  );
};
