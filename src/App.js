import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Components/Users/auth/Auth";
import Reg from "./Components/Users/auth/reg";
import Home from "./Components/Users/Pages/Home/Home";
import Welcome from "./Components/Users/Pages/Welcome/Welcome";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router basename="/">
        <Routes>
          {/* Открытые маршруты */}
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reg" element={<Reg />} />

          {/* Защищенные маршруты */}
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
