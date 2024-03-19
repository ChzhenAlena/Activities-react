// WelcomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLogout from './useLogout';
import { FaUser } from "react-icons/fa"; // Импортируем иконку пользователя
import "./WelcomePage.css"; // импортируем файл стилей для WelcomePage

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
            <h2>You are successfully logged in!</h2>
            <button className="user-page-btn" onClick={handleGoToUserPage}>Go to your activities</button>
            <button className="activities-page-btn" onClick={handleGoToActivitiesPage}>Go to all activities</button>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
    );
}

export default WelcomePage;
