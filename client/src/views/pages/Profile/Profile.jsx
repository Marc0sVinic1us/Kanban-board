import React from 'react';

import "./profile_style.css"

import backArrow from "../../../assets/svg/backArrow-icon.svg"
import profileCircleIcon from "../../../assets/svg/profile-circle-icon.svg"

function Profile() {

    const token = sessionStorage.getItem("token")
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    }    

    return (
        <div className='profile-bodyContainer'>

            <div className='profile-container'>

                <div className='back-screen'>
                    <div className='back-screen-header'>
                        <img src={backArrow}  className="back-arrow" alt="Voltar" onClick={() => window.location.href = "/home"} />
                        <div />
                    </div>
                    <img src={profileCircleIcon} className='profile-photo' alt="Foto perfil" />
                </div>


                <div className="profile-painel">
                    <button>Mudar dados</button>
                    <button>Alterar foto</button>
                    <button>Redefinir senha</button>
                </div>

            </div>
            
        </div>
    );
}

export default Profile;