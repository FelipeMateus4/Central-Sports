// src/App.js
import React from "react";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router";

function App() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}

export default App;
