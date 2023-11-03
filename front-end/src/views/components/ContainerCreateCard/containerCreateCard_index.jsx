
import { React, useState } from 'react';
import "./containerCreateCard_style.css"

function ContainerCreateCard(props) {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("")

    const token = sessionStorage.getItem("token")
    const userID = sessionStorage.getItem("userID");
    
    if (token === undefined || token === null) {
        window.location.href = "/";
    } 

    const handleCreateTask = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("userTask", [taskName, taskDescription, Number(taskPriority), userID]);
        
        // Enviando requisição para o back-end com token de acesso
        fetch("http://localhost:5000/createTask", {
            method: 'POST',
            body: formdata,
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => {
            
            alert(data.message);        
            
            if (data.status) {
                props.setTrigger(false);
            }
        })
        .catch(err => console.error(err))
            
        setTaskName("");
        setTaskDescription("");
        setTaskPriority("");
    }

    return (props.trigger) ? (
        <div className='pop-up'>
            <div className='popUp-content'>
                
                <button className='btn-close' onClick={() => props.setTrigger(false)}>X</button>
                
                <h2>Nova tarefa</h2>
                    
                <form className='taskForm' onSubmit={handleCreateTask}>
                    
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

                    <button type='submit' className='btn-create'>Criar</button> 
                    
                </form>
                
            </div>
        </div>
    ) : "";
}

export default ContainerCreateCard;
