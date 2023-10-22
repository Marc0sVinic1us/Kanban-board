import { React, useState } from "react";

import "./register_style.css"
import "../../styles/global.css"

import left_arrow from "../../img/left-arrow.png"

import PasswordInput from "../../components/PasswordInput/index_passwordInput";

function Register() {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ dateBirth, setDateBirth ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmedPassword, setConfirmedPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmedPassword) {
            
            const formData = new FormData();
            formData.append('user_singUp', [name, email, dateBirth, password]);
            
            fetch('http://localhost:5000/singUp', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {

                if (data.status) {
                    setName("")
                    setEmail("")
                    setDateBirth("")
                    setPassword("")
                    setConfirmedPassword("")

                    alert(data.message);

                    // Redireciona o usuário para a tela de login
                    window.location.replace("/")
                } else {
                    alert(data.message)
                }
                    
            })
            .catch(err => console.error(err));
            
            
        } else {
            
            alert("Senhas divergentes! \nFavor verificar e inseri-las novamente.")
            setPassword("")
            setConfirmedPassword("")
        }
    }

    return (

        <div className="body-container">

            <div className="register-container">
                <a className="returnPage-link" href="/">
                    <img 
                        src={left_arrow} 
                        alt="page-back"
                        className="returnPage-img"
                        />
                </a>
                
                <h1 className="singUp-title">Fazer Cadastro</h1>

                <form className="singUp-form" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <label className="singUp-labels">* Nome Completo:</label>
                        <input 
                            type="text"
                            id="userFullName"
                            className="name_input"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            />
                        <label className="singUp-labels">* E-mail:</label>
                        <input 
                            type="email"
                            id="userEmail"
                            className="email_input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            />
                        <label className="singUp-labels">Data de Nascimento:</label>
                        <input 
                            type="date"
                            id="userDateBirth"
                            className="dateBirth_input"
                            onChange={(e) => setDateBirth(e.target.value)}
                            value={dateBirth}
                            />

                        <label className="singUp-labels">* Senha:</label>
                        < PasswordInput 
                            id={'password_input'}
                            state={password}
                            onChange={setPassword}
                            />

                        <label className="singUp-labels">* Confirmar Senha:</label>
                        < PasswordInput 
                            id={'confirmPassword_input'}
                            state={confirmedPassword}
                            onChange={setConfirmedPassword}
                            />
                        
                    </div>

                    <div className="container-btnSingUp">
                        <button 
                            type="submit"
                            className="bnt-singUp"
                            >Cadastrar
                        </button>
                    </div>
                
                </form>
            </div>
        </div>
    )
}

export default Register;