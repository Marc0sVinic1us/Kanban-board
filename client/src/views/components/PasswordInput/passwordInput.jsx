import React, { useState } from "react";
import eye_icon from "../../../img/eye-icon.png";
import "./passwordInput_style.css";

function PasswordInput({ id, state, onChange, showRegexError, setResultRegex }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validatePassword = (password) => {
    
    // Expressão regular para garantir que a senha seja forte
    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (password && showRegexError) {
        if (strongPasswordRegex.test(password)) {
            setResultRegex(true)
            return true
        
        } else {
            setResultRegex(false)
            return false
        }
    } 
    return true
  };

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const passwordCorrect = validatePassword(state);

  return (
    <div className="inputPassword-bodyContainer">

        <div className="inputPassword-container">

        <input
            type={isPasswordVisible ? "text" : "password"}
            id={id}
            className="passwordInput"
            onChange={(e) => onChange(e.target.value)}
            value={state}
            required
            />
        <img
            className="eye-icon"
            src={eye_icon}
            alt="eye-icon"
            onClick={handleTogglePassword}
            />
        </div>

        { !passwordCorrect && showRegexError ? (
        
            <div className="password-error">
                <strong>Senha fraca!</strong>
                <p>Deve conter pelo menos 8 caracteres:</p>
                <ul>
                    <li>Incluindo letras maiúsculas e minúsculas</li>
                    <li>Números</li>
                    <li>Caracteres especiais</li>
                </ul>
            </div>
            
            ) : "" }
    
    </div>
  );
}

export default PasswordInput;
