import React from "react";
import { UserContext } from "./userContext.js";
import { useState } from "react";
export default function UserContextProvider(props) {
  const URL = "https://shortly-t6.herokuapp.com";
  const [token, setToken] = useState();
  const [userName, setUserName] = useState();
  return (
    <UserContext.Provider
      value={{ URL, token, setToken, userName, setUserName }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
