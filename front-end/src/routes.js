import { React } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/Login/index_login";
import Register from "./views/Register/index_register";
import Home from "./views/Home/index_home";

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