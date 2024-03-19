// WelcomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLogout from './useLogout'

function WelcomePage({ username, onLogout }) {
    const navigate = useNavigate();
    const logout = useLogout();

    const handleGoToUserPage = () => {
        navigate("/user"); // Перенаправляем на страницу пользователя
    };
    const handleGoToActivitiesPage = () => {
        navigate("/activities"); // Перенаправляем на страницу пользователя
    };
    return (
        <div className="container">
            {/*<p>You are successfully logged in, {username}!</p>*/}
            <p>You are successfully logged in!</p>
            <button className="logout-btn" onClick={logout}>Logout</button>
            <button className="user-page-btn" onClick={handleGoToUserPage}>Go to your activities</button>
            <button className="activities-page-btn" onClick={handleGoToActivitiesPage}>Go to all activities</button>
        </div>
    );

}
export default WelcomePage;
