
import { useState } from "react";

import "./passwordInput_style.css"
import eye_icon from "../../img/eye-icon.png"

function PasswordInput({ id, state, onChange }) {

    const [ isPasswordVisible, setIsPasswordVisible ] = useState("");

    const handleTogglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        
        <div className='inputPassword-container'>

            <input 
                type={isPasswordVisible ? 'text' : 'password'}
                id={id}
                className="passwordInput"
                onChange={(e) => onChange(e.target.value)}
                value={state}
                required
            />
            
            <img 
                className='eye-icon' 
                src={ eye_icon } 
                alt='eye-icon'
                onClick={handleTogglePassword}
            />
        </div>
    )
}

export default PasswordInput;

