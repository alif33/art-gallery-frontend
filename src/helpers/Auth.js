import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = ({ children }) => {
  const { auth } = useSelector(state=>state);

  return (
    <div>
      { auth?.isUser ? children : <Navigate replace to={"/signin"} /> }
    </div>
  );
};

export default Auth;
