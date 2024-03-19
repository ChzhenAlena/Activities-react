// UsersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLogout from './useLogout'
import {useNavigate} from "react-router-dom";

const ActivitiesPage = () => {
    const [activities, setActivities] = useState([]);
    const [mode, setMode] = useState('');
    const [people, setPeople] = useState('');
    const logout = useLogout();
    const navigate = useNavigate();

    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
    };
    const cellStyle = {
        border: '1px solid black',
        padding: '8px',
    };

    //const [id, setId] = useState('');
    const [post, setPost] = useState({
        name: '',
        priority: '',
        status: ''
    })
    const [ID, setID] = useState({
        ID: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
                const headers = {
                    'Authorization': `${token}` // Создание заголовка Authorization с токеном
                };
                console.log(headers);
                const url = localStorage.getItem("url") + '/activities';
                const response = await axios.get(url, {headers: headers});
                console.log('get performed')
                setActivities(response.data.activities);
                setMode(response.data.mode);
                setPeople(response.data.people);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);


    const handleSelectChange = (event) => {
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        setPost({...post, [event.target.name]: event.target.value})
        console.log(post)
        const url = localStorage.getItem("url") + '/users';
        axios.post(url, post, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))
    }



    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    };

    function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        const url = localStorage.getItem("url") + '/activities';
        axios.post(url, post, {headers: headers})
            .then(function (response) {
                console.log(response);
                console.log("Successfully created ");
                console.log(response.data.id);
                localStorage.setItem('jwtToken', response.data.id);
            })
            .catch(err => console.log(err))

    }
    const handleBackButtonClick = () => {
        navigate("/menu"); // Перенаправляем на страницу WelcomePage
    };

    const handleSelectChange2 = (event) => {
        setID({...ID, [event.target.name]: event.target.value});
        //
    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        const path =  localStorage.getItem("url") + '/activities/'+ + event.currentTarget.id;
        console.log(path);
        console.log(ID);
        axios.post(path, ID, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))

        // Действия по отправке данных формы
        console.log('Submitted');
    }
    const handleDelete = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        console.log(event.currentTarget)
        const path =  localStorage.getItem("url") + '/activities/'+ event.currentTarget.id;
        console.log(path);
                axios.delete(path, { headers: headers })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(err => console.log(err))

                // Действия по отправке данных формы
                console.log('Submitted');
    }



    if(mode==='admin') {
        return (
            <div>
                <form>
                    <p>Create new activity:</p>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" onChange={handleInput}/>
                    </div>
                    <div>
                        <label>Priority:</label>
                        <input type="text" name="priority" onChange={handleInput}/>
                    </div>
                    <div>
                        <label>Status:</label>
                        <input type="twxt" name="status" onChange={handleInput}/>
                    </div>
                    <button className="login-btn" type="button" onClick={handleSubmit}>Create</button>
                </form>
                <h1>Activities</h1>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Priority</th>
                        <th style={cellStyle}>Status</th>
                        <th style={cellStyle}>Person</th>
                        <th style={cellStyle}>Change person</th>
                        <th style={cellStyle}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td style={cellStyle}>{activity.activityName}</td>
                            <td style={cellStyle}>{activity.priority}</td>
                            <td style={cellStyle}>{activity.status}</td>
                            <td style={cellStyle}>{activity.personName} {activity.personSurname}</td>
                            <td style={cellStyle}>
                                <form id={activity.id} onSubmit={handleSubmit2}>
                                    <select name="ID" onChange={handleSelectChange2}>
                                        {people.map((person, index) => (
                                            <option key={index} value={person.id}>{person.name}</option>
                                        ))}
                                    </select>
                                    <button type="submit">Submit</button>
                                </form>
                            </td>
                            <td style={cellStyle}>
                                <form id = {activity.id} onSubmit={handleDelete}>
                                    <button type="submit">Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="logout-btn" type="button" onClick={logout}>Logout</button>
                <button className="logout-btn" type="button" onClick={handleBackButtonClick}>Back</button>
            </div>
        );
    }
    if (mode === 'user') {
        return (
            <div>
                <h1>Activities</h1>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Priority</th>
                        <th style={cellStyle}>Status</th>
                        <th style={cellStyle}>Person</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td style={cellStyle}>{activity.activityName}</td>
                            <td style={cellStyle}>{activity.priority}</td>
                            <td style={cellStyle}>{activity.status}</td>
                            <td style={cellStyle}>{activity.personName} {activity.personSurname}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className="logout-btn" type="button" onClick={handleBackButtonClick}>Back</button>
                <button className="logout-btn" type="button" onClick={logout}>Logout</button>
            </div>
        );
    }
};

export default ActivitiesPage;