
import { Draggable } from "@hello-pangea/dnd"

import "./taskcard_style.css"

import dragIcon from "../../../assets/svg/drag-icon.svg"

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
        <Draggable draggableId={String(props.taskKey)} index={props.index}>
            {(provided) => (    
                <div 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="task-card" 
                    onClick={handleClick} 
                    style={{border: priorityColor}}
                >
                    <div className="task-content">
                        <p>{props.taskName}</p>
                        <small>{props.taskDescription}</small>
                    </div>
                    <img src={dragIcon} alt="Arrastar" />
                </div>
            )}
        </Draggable>
    )
}

export default TaskCard;
