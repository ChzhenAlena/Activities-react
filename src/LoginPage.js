// LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Импортируем иконки из библиотеки React Icons
import "./LoginPage.css"; // импортируем файл стилей для LoginPage

function LoginPage({ onLogin }) {
    const [post, setPost] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(post);
        const url = localStorage.getItem("url") + '/login';
        axios.post(url, post)
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged in ");
                console.log(response.data.jwt);
                localStorage.setItem('jwtToken', response.data.jwt);
                navigate('/menu'); // используем это вместо history.push
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <h2>Welcome back to our website!</h2>
            <p>To continue, please login:</p>
            <form>
                <div className="input-container">
                    <label><FaEnvelope /> Email:</label>
                    <input type="text" name="email" onChange={handleInput} />
                </div>
                <div className="input-container">
                    <label><FaLock /> Password:</label>
                    <input type="password" name="password" onChange={handleInput} />
                </div>
                <button className="login-btn" type="button" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
