
import "./booleanPopUp_style.css"

function booleanPopUp(props) {

    const handleAnswer = (answer) => {
    
        if (answer) {
            // props.setAnswer(true)
            
        
        } else {
            // props.setAnswer(false)
            // console.log("Não")
        }

        // props.setTrigger(false)
    }

    return (

        <div className="pop-up">
            <div className="popup-content">
            
                <p>{props.message}</p>

                <div className="painel-btns">
                    <button onClick={console.log("Sim")}>{props.trueBtn}</button>
                    <button onClick={console.log("Não")}>{props.falseBtn}</button>
                </div>
            
            
            </div>
        </div>
    )
}

export default booleanPopUp;