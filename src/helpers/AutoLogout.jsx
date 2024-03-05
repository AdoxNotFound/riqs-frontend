import React, { useEffect } from "react";
import LogoutHandler from "./LogoutHandler";
import { useApiContext } from "../context/ApiContext";

const AutoLogout = ({ logoutTime }) => {
  const { firstResponseReceived } = useApiContext();

  useEffect(() => {
    if (firstResponseReceived) {
      console.log("AutoLogout mounted");
      const timeoutId = setTimeout(() => {
        LogoutHandler();
      }, logoutTime);
      return () => clearTimeout(timeoutId);
    }
  }, [firstResponseReceived, logoutTime]);
  return null;
};

export default AutoLogout;
