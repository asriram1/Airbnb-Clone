import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  // const [token, setToken] = useState(null);
  const [myToken, setMyToken] = useState(null);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (!user) {
      const token = getToken();
      const params = {};
      params["token"] = token;
      axios.get("/profile", { params: params }).then((res) => {
        setUser(res.data);
        setReady(true);
      });
    }
  });

  function setToken(token) {
    if (ls) {
      ls.setItem("token", token);
    }
  }

  function getToken() {
    console.log(ls);
    if (ls && ls.getItem("token")) {
      return ls.getItem("token");
      // setMyToken(ls.getItem("token"));
    }

    return null;
    // return myToken;
  }

  function clearToken() {
    if (ls && ls.getItem("token")) {
      ls.removeItem("token");
      console.log(ls);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, setToken, getToken, clearToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
