import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const storedAuth = sessionStorage.getItem('isAuthenticated') === 'true';

        if (storedUser && storedAuth) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const loginAuth = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');
    };

    return <AuthContext.Provider value={{ user, loginAuth, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
