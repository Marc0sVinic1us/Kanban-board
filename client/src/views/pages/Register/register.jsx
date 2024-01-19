import { React, useState } from "react";

import "./register_style.css"

import left_arrow from "../../../assets/svg/backArrow-icon.svg"

import PasswordInput from "../../components/PasswordInput/passwordInput.jsx";

function Register() {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ dateBirth, setDateBirth ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmedPassword, setConfirmedPassword ] = useState("");
    const [ passwordAccepted, setPasswordAccepted ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmedPassword) {

            if (passwordAccepted) {

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
                alert("Senha não é forte o suficiente!");
            }
            
        } else {
            
            alert("Senhas divergentes! \nFavor verificar e inseri-las novamente.")
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
                        title="Voltar"
                        className="returnPage-img"
                        />
                </a>
                
                <div className="signUpTitle-container">
                    <h1 className="singUp-title">Cadastrar</h1>
                </div>

                <form className="singUp-form" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <label className="singUp-labels">* Nome Completo:</label>
                        <input 
                            type="text"
                            id="userFullName"
                            className="form-input"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            />
                        <label className="singUp-labels">* E-mail:</label>
                        <input 
                            type="email"
                            id="userEmail"
                            className="form-input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            />
                        <label className="singUp-labels">Data de Nascimento:</label>
                        <input 
                            type="date"
                            id="userDateBirth"
                            className="form-input"
                            onChange={(e) => setDateBirth(e.target.value)}
                            value={dateBirth}
                            />

                        <label className="singUp-labels">* Senha:</label>
                        < PasswordInput 
                            id={'password_input'}
                            state={password}
                            onChange={setPassword}
                            showPasswordStrenghtMeter={true}
                            setPasswordAccepted={setPasswordAccepted}
                            />

                        <label className="singUp-labels">* Confirmar Senha:</label>
                        < PasswordInput 
                            id={'confirmPassword_input'}
                            state={confirmedPassword}
                            onChange={setConfirmedPassword}
                            showPasswordStrenghtMeter={false}
                            setPasswordAccepted={setPasswordAccepted}
                            />
                        
                    </div>

                    <button 
                        type="submit"
                        className="bnt-singUp"
                        >Cadastrar
                    </button>
                
                </form>
            </div>
        </div>
    )
}

export default Register;