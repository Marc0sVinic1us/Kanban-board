import React from 'react';
import zxcvbn from "zxcvbn"

import "./passwordStrenghtMeter_style.css"

function PasswordStrenghtMeter(props) {

    const testPassword = zxcvbn(props.password);
    const passwordStrenght = (testPassword.score * 100/4).toFixed(0);
    
    const changePasswordColor = () => ({
        width: `${passwordStrenght}%`,
        background: progressColor(),
        height: '100%',
        borderRadius: '30px',
        transition: 'all 0.3s'
    })

    const showPassStrenght = () => {
        if (passwordStrenght <= 0) {
            props.setPasswordAccepted(false)
            return 'Muito fraca'
        }
        else if (passwordStrenght == 25) {
            props.setPasswordAccepted(false)
            return 'Fraca'
        }
        else if (passwordStrenght == 50) {
            props.setPasswordAccepted(false)
            return 'Mediana'
        }
        else if (passwordStrenght == 75) {
            props.setPasswordAccepted(true)
            return 'Boa'
        }
        else {
            props.setPasswordAccepted(true)
            return 'Forte'
        }
    }

    const progressColor = () => {        
        if (passwordStrenght <= 0) return '#828282'
        else if (passwordStrenght == 25) return '#EA1111'
        else if (passwordStrenght == 50) return '#FFAD00'
        else if (passwordStrenght == 75) return '#9BC158'
        else return '#00B500'
    }

    return (
        <>
            <div className="passwordStrenghtMeter">
                <div className="progress-bar" style={changePasswordColor()}></div>
            </div>
            <p 
                className='passwordStrenght-label'
                style={{color: progressColor()}}
            >{showPassStrenght()}</p>
        </>
    );
}

export default PasswordStrenghtMeter;