// App.js
import React, { useState } from "react";
import LoginPage from "./LoginPage";
import WelcomePage from "./WelcomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import ActivitiesPage from "./ActivitiesPage";
function App() {
    localStorage.setItem("url", "http://35.209.156.155:8085/activities");
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/menu" element={<WelcomePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
            </Routes>
        </Router>
    );
}
export default App;
