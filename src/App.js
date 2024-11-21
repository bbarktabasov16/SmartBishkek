import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Components/Users/auth/Auth";
import Reg from "./Components/Users/auth/reg";
import Home from "./Components/Users/Pages/Home/Home";
import Welcome from "./Components/Users/Pages/Welcome/Welcome";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Components/Users/Pages/Profile/Profile";
import Search from "./Components/Users/Pages/Search/Search"
import Scan from "./Components/Users/UI/Scan/Scan";

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Reg />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scan" element={<Scan />} />


          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
