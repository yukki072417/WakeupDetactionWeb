import { Routes, Route } from "react-router-dom";

import Home from "../../features/Home/Home";
import Friend from "../../features/Friend/Friend";
import Setting from "../../features/Setting/Setting";
import SignUp from "../../features/SignUp/SignUp";
import Login from "../../features/Login/Login";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/friend" element={<Friend />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
