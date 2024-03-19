import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useLogout from './useLogout';

const UsersPage = () => {

    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState('');
    const [loading, setLoading] = useState(false);

    const statuses = ['new', 'inProgress', 'done'];

    const [ident, setIdent] = useState(0);
    const [post, setPost] = useState({ id: '' }); // Define post state and its setter
    const [post2, setPost2] = useState({ status: '' }); // Define post2 state and its setter
    const logout = useLogout();

    const navigate = useNavigate();
    const tableStyle = {
        border: '1px solid #ddd',
        borderCollapse: 'collapse',
        width: '100%',
    };
    const cellStyle = {
        border: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
    };
    const headerCellStyle = {
        ...cellStyle,
        backgroundColor: '#f2f2f2',
        color: '#333',
        fontWeight: 'bold',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const headers = {
                    'Authorization': `${token}`
                };
                const url = localStorage.getItem("url") + '/users';
                const response = await axios.get(url, {headers: headers});
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };
        const url = localStorage.getItem("url") + '/users';
        axios.post(url, post, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))
    }
    const handleSelectChange2 = (event) => {
        setPost2({...post2, [event.target.name]: event.target.value});
    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };
        const path =  localStorage.getItem("url") + '/users/'+ident;
        console.log(path);
    }

    const handleBackButtonClick = () => {
        navigate("/menu"); // Redirect to the WelcomePage
    };

    return (
        <div>
            <h1>Your Activities</h1>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <label>Select the current activity:
                    <select id="id" name="id" onChange={handleSelectChange}>
                        {activities.map(activity => (
                            <option key={activity.id} value={activity.id}>{activity.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            <br/>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerCellStyle}>Name</th>
                    <th style={headerCellStyle}>Priority</th>
                    <th style={headerCellStyle}>Status</th>
                    <th style={headerCellStyle}>Change status</th>
                </tr>
                </thead>
                <tbody>
                {activities.map((activity) => (
                    <tr key={activity.id}>
                        <td style={cellStyle}>{activity.name}</td>
                        <td style={cellStyle}>{activity.priority}</td>
                        <td style={cellStyle}>{activity.status}</td>
                        <td style={cellStyle}>
                            <form id={activity.id} onSubmit={handleSubmit2}>
                                <select id="status" name="status" onChange={handleSelectChange2}>
                                    setIdent = {activity.id};
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
