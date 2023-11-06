
import "./taskcard_style.css"

function TaskCard(props) {

    return (
        <div className="task-card">
            <strong>{props.taskname}</strong>
            <small>{props.taskdescription}</small>    
        </div>
    )
}

export default TaskCard;
