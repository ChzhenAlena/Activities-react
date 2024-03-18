// WelcomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function WelcomePage({ username, onLogout }) {
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault()
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `Bearer ${token}` // Создание заголовка Authorization с токеном
        };
        const url = localStorage.getItem("url") + '/logout';
        axios.get(url, { headers: headers })
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged out ");
                //localStorage.setItem('jwtToken', '');
                localStorage.clear();
                navigate('/'); //use this  instead of history.push
            })
            .catch(err => console.log(err))

    }

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
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="user-page-btn" onClick={handleGoToUserPage}>Go to your activities</button>
            <button className="activities-page-btn" onClick={handleGoToActivitiesPage}>Go to all activities</button>
        </div>
    );

}

export default WelcomePage;
