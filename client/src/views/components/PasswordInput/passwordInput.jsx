import React, { useState } from "react";

import "./passwordInput_style.css";

import eye_icon from "../../../assets/svg/eye-icon.svg";
import hiddenEye_icon from "../../../assets/svg/hiddenEye-icon.svg";
import PasswordStrenghtMeter from "../PasswordStrenghtMeter/PasswordStrenghtMeter";

function PasswordInput({ id, state, onChange, showPasswordStrenghtMeter, setPasswordAccepted }) {
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
            src={isPasswordVisible ? hiddenEye_icon : eye_icon}
            alt="eye-icon"
            onClick={handleTogglePassword}
            />
        </div>

        { showPasswordStrenghtMeter ? (
          <PasswordStrenghtMeter 
            password={state}
            setPasswordAccepted={setPasswordAccepted}
          />
        ) : "" }    
    </div>
  );
}

export default PasswordInput;
