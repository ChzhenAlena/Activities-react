import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useLogout from './useLogout';
import { useNavigate } from 'react-router-dom';

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
    const containerStyle = {
        maxHeight: '400px', // Примерная высота контейнера для прокрутки
        overflowY: 'auto', // Включение вертикальной прокрутки по необходимости
    };
    const [post, setPost] = useState({
        name: '',
        priority: '',
        status: '',
    });
    const [ID, setID] = useState({
        ID: '',
    });
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const headers = {
                Authorization: `${token}`,
            };
            const url = localStorage.getItem('url') + '/activities';
            const response = await axios.get(url, { headers: headers });
            setActivities(response.data.activities);
            setMode(response.data.mode);
            setPeople(response.data.people);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInput = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    function handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            Authorization: `${token}`,
        };
        const url = localStorage.getItem('url') + '/activities';
        axios
            .post(url, post, { headers: headers })
            .then(function (response) {
                console.log(response);
                console.log('Successfully created ');
                console.log(response.data.id);
                localStorage.setItem('jwtToken', response.data.id);
                fetchData();
            })
            .catch((err) => console.log(err));
    }
    const handleBackButtonClick = () => {
        navigate('/menu');
    };

    const handleSelectChange2 = (event) => {
        setID({ ...ID, [event.target.name]: event.target.value });
    };
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            Authorization: `${token}`,
        };
        const path =
            localStorage.getItem('url') + '/activities/' + +event.currentTarget.id;
        axios
            .post(path, ID, { headers: headers })
            .then(function (response) {
                console.log(response);
                fetchData();
            })
            .catch((err) => console.log(err));
    };
    const handleDelete = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            Authorization: `${token}`,
        };
        const path =
            localStorage.getItem('url') + '/activities/' + event.currentTarget.id;
        axios
            .delete(path, { headers: headers })
            .then(function (response) {
                console.log(response);
                fetchData();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {mode === 'admin' && (
                <form>
                    <h2>Create new activity:</h2>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" onChange={handleInput} />
                    </div>
                    <div>
                        <label>Priority:</label>
                        <input type="text" name="priority" onChange={handleInput} />
                    </div>
                    <div>
                        <label>Status:</label>
                        <input type="text" name="status" onChange={handleInput} />
                    </div>
                    <button className="login-btn" type="button" onClick={handleSubmit}>
                        Create
                    </button>
                </form>
            )}
            <h1>Activities</h1>
            <div style={containerStyle}>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={cellStyle}>#</th>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Priority</th>
                        <th style={cellStyle}>Status</th>
                        <th style={cellStyle}>Person</th>
                        {mode === 'admin' && <th style={cellStyle}>Change person</th>}
                        {mode === 'admin' && <th style={cellStyle}></th>}
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((activity, index) => (
                        <tr key={activity.id}>
                            <td style={cellStyle}>{index + 1}</td>
                            <td style={cellStyle}>{activity.activityName}</td>
                            <td style={cellStyle}>{activity.priority}</td>
                            <td style={cellStyle}>{activity.status}</td>
                            <td style={cellStyle}>
                                {activity.personName} {activity.personSurname}
                            </td>
                            {mode === 'admin' && (
                                <td style={cellStyle}>
                                    <form id={activity.id} onSubmit={handleSubmit2}>
                                        <select name="ID" onChange={handleSelectChange2}>
                                            {people.map((person, index) => (
                                                <option key={index} value={person.id}>
                                                    {person.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button type="submit">Submit</button>
                                    </form>
                                </td>
                            )}
                            {mode === 'admin' && (
                                <td style={cellStyle}>
                                    <form id={activity.id} onSubmit={handleDelete}>
                                        <button type="submit">Delete</button>
                                    </form>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button className="logout-btn" type="button" onClick={handleBackButtonClick}>
                Back
            </button>
            <button className="logout-btn" type="button" onClick={logout}>
                Logout
            </button>
        </div>
    );
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
