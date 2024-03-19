import axios from "axios";
import {useNavigate} from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();
    const logout = () => {
//        event.preventDefault();
        const token = localStorage.getItem('jwtToken'); // Получение токена из localStorage
        const headers = {
            'Authorization': `${token}` // Создание заголовка Authorization с токеном
        };
        const url = localStorage.getItem("url") + '/logout';
        axios.get(url, {headers: headers})
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged out ");
                //localStorage.setItem('jwtToken', '');
                localStorage.clear();
                navigate('/'); //use this  instead of history.push
            })
    }
    return logout;
}
export default useLogout;
