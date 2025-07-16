import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogout } from '../services/authService';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        const accessToken = Cookies.get('access_token');

        if (storedUser && !accessToken) {
            localStorage.removeItem('userInfo');
        } else if (storedUser && accessToken) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    const logout = async () => {
        await postLogout();

        localStorage.removeItem('userInfo');
        setUserInfo(null);
        navigate('/login');
    };

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
