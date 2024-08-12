// src/App.js
import React from 'react';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router';
import Header from './Components/Header/Header';

function App() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
