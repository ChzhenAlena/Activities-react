// UsersPage.js
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import useLogout from './useLogout'

const UsersPage = () => {

    const [activities, setActivities] = useState([]);
    const statuses = ['new', 'inProgress', 'done'];
    const logout = useLogout();


    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
    };
    const cellStyle = {
        border: '1px solid black',
        padding: '8px',
    };

    const [id, setId] = useState({
        id: '',
    })
    const [status, setStatus] = useState({
        status: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
                const headers = {
                    'Authorization': `${token}` // Создание заголовка Authorization с токеном
                };
                console.log(headers);
                const url = localStorage.getItem("url") + '/users';
                const response = await axios.get(url, {headers: headers});
                console.log('get performed')
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        setId({...id, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        console.log('selectedOption')

        const url = localStorage.getItem("url") + '/users';
        axios.post(url, id, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))

        // Действия по отправке данных формы
        console.log('Submitted');
    }
    const handleSelectChange2 = (event) => {
        setStatus({...status, [event.target.name]: event.target.value});
    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
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

    return (
        <div>
            <h1>Your Activities</h1>
            <form onSubmit={handleSubmit}>
                <label>Выберите текущую активность:
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
                    <th style={cellStyle}>Name</th>
                    <th style={cellStyle}>Priority</th>
                    <th style={cellStyle}>Status</th>
                    <th style={cellStyle}>Change status</th>
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
                        </form></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <button className="logout-btn" type="button" onClick={logout}>Logout</button>
        </div>
    );
};

export default UsersPage;