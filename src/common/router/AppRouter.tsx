import { Routes, Route } from "react-router-dom";

import Landing from "../../features/Landing/Landing";
import Home from "../../features/Home/Home";
import Friend from "../../features/Friend/Friend";
import Setting from "../../features/Setting/Setting";
import SignUp from "../../features/SignUp/SignUp";
import SignUpProfile from "../../features/SignUp/SignUpProfile";
import Login from "../../features/Login/Login";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      <Route
        path="/friend"
        element={
          <RequireAuth>
            <Friend />
          </RequireAuth>
        }
      />
      <Route
        path="/setting"
        element={
          <RequireAuth>
            <Setting />
          </RequireAuth>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/profile" element={<SignUpProfile />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
