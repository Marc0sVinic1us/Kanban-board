
import { React, useState } from 'react';

import "./containerViewCard_style.css"

function ContainerViewCard(props) {

    console.log(props.taskData.taskName)

    const [taskName, setTaskName] = useState(props.taskData.taskName);
    const [taskDescription, setTaskDescription] = useState(props.taskData.taskDescription);
    const [taskPriority, setTaskPriority] = useState(props.taskData.taskPriority);

    const token = sessionStorage.getItem("token")
    const userID = sessionStorage.getItem("userID");
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    } 

    return (
        <div className='popUp-viewTask'>
            <div className='popUpContent-viewTask'>
                
                <button className='btnClose-task' title='Fechar painel' onClick={() => props.setTrigger(false)}>X</button>
                    
                <form className='taskForm-task'>
                    
                    <input 
                        required
                        type="text" 
                        value={taskName} 
                        onChange={(e) => setTaskName(e.target.value)} 
                        placeholder='Nome da tarefa'
                    />
                    
                    <textarea 
                        name="description" 
                        id="description-textarea" 
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        cols="10" 
                        rows="10" 
                        placeholder='Descrição'
                    ></textarea>
                    
                    <select 
                        required
                        name="priorityDropdown" 
                        id="priorityDropdown"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                    >
                        <option value="">Selecione a prioridade</option>
                        <option value="1">Prioridade 1</option>
                        <option value="2">Prioridade 2</option>
                        <option value="3">Prioridade 3</option>
                        <option value="4">Prioridade 4</option>
                    </select>
                    
                </form>
                
            </div>
        </div>
    );
}

export default ContainerViewCard;
