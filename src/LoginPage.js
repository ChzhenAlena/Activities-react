// LoginPage.js
import React, {Component, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginPage({ onLogin }) {
    const [post, setPost] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    };
    function handleSubmit(event) {
        event.preventDefault()
        console.log(post);
        const url = localStorage.getItem("url") + '/login';
        axios.post(url, post)
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged in ");
                console.log(response.data.id);
                localStorage.setItem('jwtToken', response.data.id);
                navigate('/menu'); //use this  instead of history.push
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="container">
            <h2>Welcome to our website</h2>
            <p>To continue, please login:</p>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" name="email" onChange={handleInput} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleInput} />
                </div>
                <button className="login-btn" type="button" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}
export default LoginPage;