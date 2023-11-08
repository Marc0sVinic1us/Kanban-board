
import "./taskcard_style.css"

function TaskCard(props) {

    let priorityColor = 'solid 3px ';
    
    if (props.taskpriority === 1) {
        priorityColor += 'red'
    
    } else if (props.taskpriority === 2) {
        priorityColor += 'orange';
    
    } else if (props.taskpriority === 3) {
        priorityColor += 'yellow';
    
    } else if (props.taskpriority === 4) {
        priorityColor += 'lightgreen';
    }

    return (
        <div className="task-card" style={{border: priorityColor}}>
            <strong>{props.taskname}</strong>
            <small>{props.taskdescription}</small>    
        </div>
    )
}

export default TaskCard;
