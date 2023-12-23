import { React } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../src/styles/global.css"

import Login from "./views/pages/Login/login.jsx";
import Register from "./views/pages/Register/register.jsx";
import Home from "./views/pages/Home/home.jsx";

const routes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Login /> } path="/" exact/>
                <Route element={ <Register /> } path="/singUp" exact/>
                <Route element = { <Home /> } path="/home" exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default routes;