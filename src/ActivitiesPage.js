import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLogout from './useLogout';
import { useNavigate } from "react-router-dom";
import './UserPage.css'; // Подключаем файл стилей

const ActivitiesPage = () => {
    const [activities, setActivities] = useState([]);
    const [mode, setMode] = useState('');
    const [people, setPeople] = useState('');
    const logout = useLogout();
    const navigate = useNavigate();

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
                const token = localStorage.getItem('jwtToken');
                const headers = {
                    'Authorization': `${token}`
                };
                const url = localStorage.getItem("url") + '/activities';
                const response = await axios.get(url, {headers: headers});
                setActivities(response.data.activities);
                setMode(response.data.mode);
                setPeople(response.data.people);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    };

    function handleSubmit(event) {
        event.preventDefault()
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
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
        navigate("/menu");
    };

    const handleSelectChange2 = (event) => {
        setID({...ID, [event.target.name]: event.target.value});
    }

    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };
        const path =  localStorage.getItem("url") + '/activities/'+ + event.currentTarget.id;
        axios.post(path, ID, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };
        const path =  localStorage.getItem("url") + '/activities/'+ event.currentTarget.id;
        axios.delete(path, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {mode === 'admin' && (
                <div>
                    <form>
                        {/* Ваша форма создания активности */}
                    </form>
                    <h1>Activities</h1>
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                            <tr>
                                <th>#</th> {/* Добавляем колонку для нумерации */}
                                <th>Name</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Person</th>
                                <th>Change person</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {activities.map((activity, index) => (
                                <tr key={activity.id}>
                                    <td>{index + 1}</td> {/* Выводим номер строки */}
                                    <td>{activity.activityName}</td>
                                    <td>{activity.priority}</td>
                                    <td>{activity.status}</td>
                                    <td>{activity.personName} {activity.personSurname}</td>
                                    <td>
                                        {/* Форма и кнопка для изменения персоны */}
                                    </td>
                                    <td>
                                        {/* Форма и кнопка для удаления активности */}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Кнопки для выхода и возврата */}
                </div>
            )}
            {mode === 'user' && (
                <div>
                    <h1>Activities</h1>
                    <div className="table-container">
                        <table className="custom-table">
                            <thead>
                            <tr>
                                <th>#</th> {/* Добавляем колонку для нумерации */}
                                <th>Name</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Person</th>
                            </tr>
                            </thead>
                            <tbody>
                            {activities.map((activity, index) => (
                                <tr key={activity.id}>
                                    <td>{index + 1}</td> {/* Выводим номер строки */}
                                    <td>{activity.activityName}</td>
                                    <td>{activity.priority}</td>
                                    <td>{activity.status}</td>
                                    <td>{activity.personName} {activity.personSurname}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="logout-btn" type="button" onClick={handleBackButtonClick}>Back</button>
                    <button className="logout-btn" type="button" onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default ActivitiesPage;
