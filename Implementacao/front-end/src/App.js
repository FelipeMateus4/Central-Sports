import React from 'react';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router';
import Header from './Components/Header/Header';
import { AuthProvider } from './Context/AuthContext';

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <Outlet />
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
