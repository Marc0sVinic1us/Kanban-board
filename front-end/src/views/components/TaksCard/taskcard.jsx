
import "./taskcard_style.css"

function TaskCard(props) {

    let priorityColor = 'solid 3px ';
    
    if (props.taskPriority === 1) {
        priorityColor += 'red'
    
    } else if (props.taskPriority === 2) {
        priorityColor += 'orange';
    
    } else if (props.taskPriority === 3) {
        priorityColor += 'gold';
    
    } else if (props.taskPriority === 4) {
        priorityColor += 'lightgreen';
    }

    const handleClick = () => {
        props.setTriggerViewTask(true); 
        props.setTaskDataView(
            {
                "taskKey": props.taskKey,
                "taskName" : props.taskName,
                "taskDescription": props.taskDescription,
                "taskPriority": props.taskPriority
            }
        );       
    }

    return (
        <div className="task-card" onClick={handleClick} style={{border: priorityColor}}>
            <strong>{props.taskName}</strong>
            <small>{props.taskDescription}</small>    
        </div>
    )
}

export default TaskCard;
