import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Layout from "./pages/layout";
import Auth from "./Auth";
import UserList from "./pages/layout/userList/userList";
import ArtsList from "./pages/layout/artsList/artsList";
import Artist from "./pages/layout/artist/artist";
import FunFacts from "./pages/layout/funfacts/funfacts";

const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="" element={<Auth><UserList /></Auth>}/>
          <Route path="artist" element={<Auth><Artist /></Auth>}/>
          <Route path="artsList" element={<Auth><ArtsList /></Auth>}/>
          <Route path="funfacts" element={<Auth><FunFacts /></Auth>}/>
        </Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouting;
