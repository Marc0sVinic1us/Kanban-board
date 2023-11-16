
import "./booleanPopUp_style.css"

function booleanPopUp(props) {

    const handleAnswer = (answer) => {
    
        if (answer)
            props.setAnswer(true)   
        else
            props.setAnswer(false)
        
        props.setTrigger(false)
    }

    return (

        <div className="pop-up">
            <div className="popup-content">
            
                <strong>{props.message}</strong>

                <div className="painel-btns">
                    <button onClick={() => {handleAnswer(true)}}>{props.trueBtn}</button>
                    <button onClick={() => {handleAnswer(false)}}>{props.falseBtn}</button>  
                </div>
            
            
            </div>
        </div>
    )
}

export default booleanPopUp;