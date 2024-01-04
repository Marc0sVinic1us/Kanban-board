
import "./navbar_style.css"

import { React, useState } from "react"

import ProfileMenu from "../ProfileMenu/ProfileMenu"

import profileIcon from "../../../assets/svg/profile-icon.svg"
// import profileCircleIcon from "../../../assets/svg/profile-circle-icon.svg"

function Navbar() {

    const [ openProfileMenu, setOpenProfileMenu ] = useState(false);

    // const token = sessionStorage.getItem("token");

    const firstUserName = sessionStorage.getItem("username").split(" ")[0]

    return (
        
        <nav className="navbar">

            <h1 className="app-name">Kanban Board</h1>

            <h4>Olá, {firstUserName}!</h4>
            
            {/* { token && token !== "" && token !== undefined ? 
                
                <button className="btn-logActions" title="Encerrar sessão" onClick={ handleLogout }>Sair</button>
             : 
                <button className="btn-logActions">Entrar</button>
            } */}

            <img title="Perfil" src={profileIcon} onClick={() => setOpenProfileMenu(!openProfileMenu)} alt="Perfil" />

            { openProfileMenu ? (
                <ProfileMenu />
            ) : "" }
        
        </nav>
    )
}

export default Navbar;
