
import "./profileMenu_style.css"

import React from 'react';

function ProfileMenu(props) {

    const handleLogout = () => {
        
        // Limpa cookies
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("useremail");
        sessionStorage.removeItem("userID");
        
        // Redireciona o usário para a tela de login
        window.location.href = "/";
    }

    return (
        <div className="profileMenu-bodyContainer">

            <div className="profileMenu-content">
                <button className="btn-profile-actions" title="Configurar perfil" onClick={() => window.location.href = "/profile"}>Meu perfil</button>
                <button className="btn-logout" title="Sair do app" onClick={handleLogout}>Sair</button>
            </div>
            
        </div>
    );
}

export default ProfileMenu;
