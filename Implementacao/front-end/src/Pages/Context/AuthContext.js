import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const token = Cookies.get('connect.sid');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const loginAuth = (userData) => {
        const token = Cookies.get('connect.sid');

        if (token) {
            setUser(userData);
            setIsAuthenticated(true);
            sessionStorage.setItem('user', JSON.stringify(userData));
            sessionStorage.setItem('isAuthenticated', 'true');
        } else {
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');
        Cookies.remove('connect.sid'); //  remove o cookie de sessão
    };

    return <AuthContext.Provider value={{ user, loginAuth, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
