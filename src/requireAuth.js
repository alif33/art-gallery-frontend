import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authChecker } from "./shared/authChecker";
import { useSelector } from "react-redux";

const RequireAuth = ({ protectedPath, children }) => {
  const location = useLocation();
  const { auth } = useSelector(state=>state);
  let url = `/?redirectUrl=${location?.pathname}`;

  console.log(auth);


  return (
    <div>
      {protectedPath ? (
        <>{auth?.isUser ? children : <Navigate replace to={url} />}</>
      ) : (
        children
      )}
    </div>
  );
};

export default RequireAuth;
