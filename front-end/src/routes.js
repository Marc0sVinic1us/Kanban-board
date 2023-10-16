import { React } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/Login/index_login";
import Register from "./views/Register/index_register";

const routes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Login/> } path="/" exact/>
                <Route element={ <Register/> } path="/singUp" exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default routes;