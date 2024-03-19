import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";
import useLogout from './useLogout';


const UsersPage = () => {

    const [activities, setActivities] = useState([]);
    const statuses = ['new', 'inProgress', 'done'];

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



    const [ID, setID] = useState({
        ID: '',
    })
    const [status, setStatus] = useState({
        status: '',
    })

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
        setID({...ID, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };

        console.log('selectedOption')

        const url = localStorage.getItem("url") + '/users';
        axios.post(url, ID, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))
    }
    const handleSelectChange2 = (event) => {

        setStatus({...status, [event.target.name]: event.target.value});

    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        const headers = {
            'Authorization': `${token}`
        };

        const path =  localStorage.getItem("url") + '/users/'+ event.currentTarget.id;
        console.log(path);
        axios.post(path, status, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))
        console.log('Submitted');
    }

    const handleBackButtonClick = () => {
        navigate("/menu"); // Redirect to the WelcomePage
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
