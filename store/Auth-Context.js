import React from "react";
import { useState, useEffect } from "react";
const AuthContext = React.createContext({
  islogged: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const StorageData = localStorage.getItem("isloggedin");
    if (StorageData === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    localStorage.setItem("isloggedin", "1");
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isloggedin");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        islogged: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
