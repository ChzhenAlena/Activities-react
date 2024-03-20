import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useLogout from './useLogout';
import './UserPage.css'; // Подключаем файл стилей

const UsersPage = () => {
    const [activities, setActivities] = useState([]);
    const statuses = ['new', 'inProgress', 'done'];

    const logout = useLogout();
    const navigate = useNavigate();

    const [ID, setID] = useState({ ID: '' });
    const [status, setStatus] = useState({ status: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const headers = {
                'Authorization': `${token}`
            };
            const url = localStorage.getItem("url") + '/users';
            const response = await axios.get(url, {headers: headers});
            setActivities(response.data.sort((a, b) => a.id - b.id));
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleSelectChange = (event) => {
        setID({...ID, [event.target.name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };
        const url = localStorage.getItem("url") + '/users';
        axios.post(url, ID, { headers: headers })
            .then(function (response) {
                console.log(response);
                fetchData();
            })
            .catch(err => console.log(err))
    };

    const handleSelectChange2 = (event) => {
        setStatus({...status, [event.target.name]: event.target.value});
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };
        const path =  localStorage.getItem("url") + '/users/'+ event.currentTarget.id;
        axios.post(path, status, { headers: headers })
            .then(function (response) {
                console.log(response);
                fetchData();
                setStatus({ status: '' }); // Сбрасываем значение status после успешного изменения статуса
            })
            .catch(err => console.log(err))
    };

    const handleBackButtonClick = () => {
        navigate("/menu");
    };

    return (
        <div>
            <h1>Your Activities</h1>
            <form onSubmit={handleSubmit}>
                <label>Select the current activity:
                    <select id="ID" name="ID" onChange={handleSelectChange}>
                        {activities.map(activity => (
                            <option key={activity.id} value={activity.id}>{activity.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <table className="custom-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Change status</th>
                </tr>
                </thead>
                <tbody>
                {activities.map((activity, index) => (
                    <tr key={activity.id}>
                        <td>{index + 1}</td>
                        <td>{activity.name}</td>
                        <td>{activity.priority}</td>
                        <td>{activity.status}</td>
                        <td>
                            <form id={activity.id} onSubmit={handleSubmit2}>
                                <select id="status" name="status" onChange={handleSelectChange2} value={status.status}>
                                    <option value="" disabled hidden>Choose the status</option>
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>
                                    ))}
                                </select>
                                <button type="submit">Submit</button>
                            </form>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <button className="logout-btn" type="button" onClick={handleBackButtonClick}>Back</button>
            <button className="logout-btn" type="button" onClick={logout}>Logout</button>
        </div>
    );
};

export default UsersPage;
