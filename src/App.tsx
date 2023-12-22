import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function App() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <>
                <Home />
              </>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />

        <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

// TODO handle the case when token got expires but stored inside local storage (update it - logout the user)
