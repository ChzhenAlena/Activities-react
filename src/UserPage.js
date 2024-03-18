// UsersPage.js
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UsersPage = () => {

    const [activities, setActivities] = useState([]);
    const [activityId, setActivityId] = useState('');
    const [loading, setLoading] = useState(false);

    const statuses = ['new', 'inProgress', 'done'];

    const [ident, setIdent] = useState(0);


    const navigate = useNavigate();
    const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
    };
    const cellStyle = {
        border: '1px solid black',
        padding: '8px',
    };

    const [post, setPost] = useState({
        id: '',
    })
    const [post2, setPost2] = useState({
        //id: '',
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

    function handleLogout(event) {
        event.preventDefault()
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        const url = localStorage.getItem("url") + '/logout';
        axios.get(url, { headers: headers })
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged out ");
                //localStorage.setItem('jwtToken', '');
                localStorage.clear();
                navigate('/'); //use this  instead of history.push
            })
            .catch(err => console.log(err))

    }
    const handleSelectChange = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        console.log('selectedOption')
        console.log(post)
        const url = localStorage.getItem("url") + '/users';
        axios.post(url, post, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))

        // Действия по отправке данных формы
        console.log('Submitted');
    }
    const handleSelectChange2 = (event) => {
        setPost2({...post2, [event.target.name]: event.target.value});
        //
    }
    const handleSubmit2 = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        console.log('selectedOption')
        console.log(post2);
        console.log(ident)
        const path =  localStorage.getItem("url") + '/users'+ident;
        console.log(path);
        /*axios.post('http://192.168.100.41:8085/activities/users', post2, { headers: headers })
            .then(function (response) {
                console.log(response);
            })
            .catch(err => console.log(err))

        // Действия по отправке данных формы
        console.log('Submitted');*/
    }

    return (
        <div>
            <h1>Your Activities</h1>
            {loading && <p>Loading...</p>}
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
                        <td style={cellStyle}><form onSubmit={handleSubmit2}>
                                <select id="status" name="status" onChange={handleSelectChange2}>
                                    setIdent = {activity.id};
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
            {/*            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>{activity.name}, priority: {activity.priority}, status: {activity.status}</li>
                ))}
            </ul>*/}
            <br/>
            <button className="logout-btn" type="button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UsersPage;