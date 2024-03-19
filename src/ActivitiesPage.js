// UsersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import useLogout from './useLogout'

const ActivitiesPage = () => {
    const [activities, setActivities] = useState([]);
    const [mode, setMode] = useState('');
    const [loading, setLoading] = useState(false);
    const logout = useLogout();

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
    const navigate = useNavigate();

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
                {loading && <p>Loading...</p>}
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
                {/*<ul>
                    {activities.map(activity => (
                        <li key={activity.id}>{activity.activityName}, priority: {activity.priority},
                            status: {activity.status}, person: {activity.personName} {activity.personSurname}</li>
                    ))}
                </ul>*/}
                <button className="logout-btn" type="button" onClick={logout}>Logout</button>
            </div>
        );
    }
    if (mode === 'user') {
        return (
            <div>
                <h1>Activities</h1>
                {loading && <p>Loading...</p>}
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
                {/*                <ul>
                    {activities.map(activity => (
                        <li key={activity.id}>{activity.activityName}, priority: {activity.priority},
                            status: {activity.status}, person: {activity.personName} {activity.personSurname}</li>
                    ))}
                </ul>*/}
                <button className="logout-btn" type="button" onClick={logout}>Logout</button>
            </div>
        );
    }


    /*useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/activities');
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleActivitySubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post('/users', { id: activityId });
            // После успешного добавления можно обновить список активностей
            fetchActivities();
        } catch (error) {
            console.error('Error adding activity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>All Activities</h1>
            {loading && <p>Loading...</p>}
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>{activity.name}</li>
                ))}
            </ul>
            <form onSubmit={handleActivitySubmit}>
                <label>
                    Activity ID:
                    <input
                        type="text"
                        value={activityId}
                        onChange={(e) => setActivityId(e.target.value)}
                    />
                </label>
                <button type="submit">Add Activity</button>
            </form>
        </div>
    );*/
};

export default ActivitiesPage;