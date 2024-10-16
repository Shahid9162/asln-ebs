/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const usersList = [{ username: "Shahid S", password: "Shahid@123" }];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = (username, password) => {
    const foundUser = usersList.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setUser({ username: foundUser.username });
      return true;
    }
    return false;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
